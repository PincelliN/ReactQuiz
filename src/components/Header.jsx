import headerlogo from '../assets/quiz-logo.png'
export default function Header(){
    return(
        <header>
            <img src={headerlogo} alt="logo" />
            <h1>ReactQuiz</h1>
        </header>
    );
}