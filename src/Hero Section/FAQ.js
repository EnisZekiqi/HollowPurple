import faq from '../images/Solitone.png'
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import linear from '../images/1.png'
const FAQ = () => {


   
    return ( 
        <div id='faq' className="FAQ bg-opacity-60 backdrop-blur-md flex justify-center items-center" style={{ backgroundColor: '#010103', color: '#ffffff', padding: '20px',backgroundImage:linear }}>
            <BlockInTextCard
        tag=" FAQ"
        text={
          <p className=' text-center' style={{color:'#9f9fac'}}>
            <strong style={{color:'#d6d6dc'}} className='font-semibold'>Have questions?</strong> Here are some common questions with their answers
          </p>
        }
        examples={[
          "Why should you choose HollowPurple ?",
          "What is HollowPurple ?",
          "How does HollowPurple work ?",
          "How can i purchase a product",
        ]}
        answers={[
          "HollowPurple is easy,simple and very fast for any product that you will choose",
          "HollowPurple is an ecommerce company that offers you various of products that you want",
          "The website is the main part of how we work , most of the work is here where you can ask us questions have and complain and much more",
          "It is very simple you just select the product you want to purchase , select type or it's specifics and then choose how should be shipped and that is it ",
        ]}
      />
    
    
        </div>
     );
}
 

const BlockInTextCard = ({ tag, text, examples,answers }) => {
    return (
      <div className="w-full max-w-2xl space-y-6">
        <div>
          <p className="mb-1.5 text-xl font-bold uppercase">{tag}</p>
          <hr className="" style={{borderColor:'#3b3b45'}} />
        </div>
        <p className="max-w-2xl text-lg font-normal leading-relaxed">{text}</p>
        <div>
          <Typewrite examples={examples} />
          <Answers answers={answers}/>
          <hr className=""style={{borderColor:'#3b3b45'}} />
        </div>
      </div>
    );
  };
  
  const LETTER_DELAY = 0.025;
  const BOX_FADE_DURATION = 0.125;
  
  const FADE_DELAY = 5;
  const MAIN_FADE_DURATION = 0.25;
  
  const SWAP_DELAY_IN_MS = 7500;
  
  const Typewrite = ({ examples }) => {
    const [exampleIndex, setExampleIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setExampleIndex((pv) => (pv + 1) % examples.length);
      }, SWAP_DELAY_IN_MS);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <p className="mb-2.5 text-sm font-light "  style={{color:'#fbfbfb'}}>
        <span className="inline-block size-2 bg-neutral-400" />
        <span className="ml-3">
          QUESTIONS:{" "}
          {examples[exampleIndex].split("").map((l, i) => (
            <motion.span
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 0,
              }}
              transition={{
                delay: FADE_DELAY,
                duration: MAIN_FADE_DURATION,
                ease: "easeInOut",
              }}
              key={`${exampleIndex}-${i}`}
              className="relative"
            >
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: i * LETTER_DELAY,
                  duration: 0,
                }}
              >
                {l}
              </motion.span>
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: i * LETTER_DELAY,
                  times: [0, 0.1, 1],
                  duration: BOX_FADE_DURATION,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-400"
              />
            </motion.span>
          ))}
        </span>
      </p>
    );
  };

  

  const Answers = ({ answers }) => {
    const [answersIndex, setAnswerIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setAnswerIndex((pv) => (pv + 1) % answers.length);
      }, 7500);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <p className="mb-2.5 text-sm font-light"  style={{color:'#fbfbfb'}}>
        <span className="inline-block size-2 bg-neutral-400" />
        <span className="ml-3 ">
          ANSWERS:{" "}
          {answers[answersIndex].split("").map((l, i) => (
            <motion.span
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 0,
              }}
              transition={{
                delay: FADE_DELAY,
                duration: MAIN_FADE_DURATION,
                ease: "easeInOut",
              }}
              key={`${answersIndex}-${i}`}
              className="relative"
            >
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: i * LETTER_DELAY,
                  duration: 0,
                }}
              >
                {l}
              </motion.span>
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: i * LETTER_DELAY,
                  times: [0, 0.1, 1],
                  duration: BOX_FADE_DURATION,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-400"
              />
            </motion.span>
          ))}
        </span>
      </p>
    );
  };
  
export default FAQ;