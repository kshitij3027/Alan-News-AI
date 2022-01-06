import React,{useState, useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards'
import classNames from 'classnames';
import wordsToNumbers from 'words-to-numbers';
import useStyles from "./styles.js";
const alanKey = 'your-alanai-key';
const App = () => {
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    useEffect(()=>{
        alanBtn({
            key:alanKey,
            onCommand: ({command,articles, number}) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle+1);
                }
                else if(command === 'open'){
                   const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            //alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }


                }

            }
        })
    },[])

    const classes = useStyles();
    return (
        <div>
           <div className={classes.logoContainer}>
               <img src='https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg' className={classes.alanLogo} alt="alan logo"/>
           </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App
