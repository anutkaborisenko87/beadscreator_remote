import {useWindowSize} from "react-use";

const Home = () => {
    const {width} = useWindowSize();
    return (
        <div className={'w-5/6 mx-auto flex flex-col gap-[2em] py-[2em]'}>
            <div className={`grid ${width > 700 ? 'grid-cols-2 gap-[2em]' : 'grid-cols-1 gap-[0.5em]'}`}>
                <div className={`flex flex-col ${width > 700 ? 'gap-[2em]' : 'gap-[0.5em]'}`}>
                    <div className={`text-start homepage-main-sections ${width > 700 ?  'text-[1.5em]' : 'text-[1em]' }`}>
                        <p>
                            Наш сайт допомагає перетворити ваші ідеї на унікальні бісерні шедеври. Завдяки зручному
                            онлайн-редактору, ви можете легко створювати власні схеми, експериментувати з кольорами та формами,
                            а також ділитися своїми роботами з іншими майстрами. Почніть творити вже сьогодні!
                        </p>
                    </div>
                    <div className={`text-center homepage-main-sections ${width > 700 ?  'text-[1.5em]' : 'text-[1em]' }`}>
                        <h3>
                            Створіть свою першу схему! Приєднуйтесь до спільноти творчих людей і діліться своїми ідеями.
                        </h3>
                    </div>
                </div>

                <div className={`homepage-main-sections`}>
                    <h4 className={`text-center ${width > 700 ?  'text-[2em]' : 'text-[1.5em]' }`}>
                        Про нас
                    </h4>
                    <p className={`text-start ${width > 700 ?  'text-[1.5em]' : 'text-[1em]' }`}>Ми — команда ентузіастів, що захоплюється мистецтвом бісеру. Наша місія — надихати та підтримувати
                        творчість, надаючи зручні інструменти для створення та обміну бісерними схемами. Приєднуйтесь до
                        нашої спільноти та відкрийте нові горизонти у світі ручної роботи!</p>
                </div>
            </div>
            <div className={`homepage-main-sections`}>
                <h4 className={`text-center ${width > 700 ?  'text-[2em]' : 'text-[1.5em]' }`}>Наш онлайн-редактор дозволяє:</h4>
                <div className={`grid ${width > 700 ? 'grid-cols-2 justify-between text-[1.5em]' : 'grid-cols-1 text-[1em]'}`}>
                    <ul>
                        <li>Інтуїтивно створювати бісерні схеми</li>
                        <li>Вибирати з широкої палітри кольорів</li>
                    </ul>
                    <ul>
                        <li>Зберігати та експортувати ваші роботи</li>
                        <li>Отримувати поради та натхнення від спільноти</li>
                    </ul>
                </div>

            </div>


        </div>
    );
};
export default Home;
