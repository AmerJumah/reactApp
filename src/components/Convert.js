import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Convert = ({language, text}) => {
    const[translated, setTranslated] = useState('')
    const[bounceText, debounceText] = useState(text)

    useEffect(()=>{
        const timerId = setTimeout(()=>{
           debounceText(text) 
        },800)

        return(()=>{
            clearTimeout(timerId)
        })
    },[text])


    useEffect(()=>{
        const doTranslate = async ()=>{
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2',{},{
                params : {
                    q : bounceText,
                    target : language.value,
                    key : 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            })
        setTranslated(data.data.translations[0].translatedText)
        }
        doTranslate()
    },[language,bounceText])
    
    return (
        <div>
           <h1 className='ui header'>{translated}</h1> 
        </div>
    )
}

export default Convert