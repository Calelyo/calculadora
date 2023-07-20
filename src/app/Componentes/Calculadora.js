'use client'
import { useState } from 'react'
import '../Estilos/calculadora.css'

export default function Calculadora(){
    const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '', '.'];
    const signos = ['', '=', '+', '-', '*', '/', 'borrar', '+-', '%', 'AC'];
    const dividirEnCero = '¿Dividir entre cero? ¿En serio?';

    const[signoActual, setSignoActual] = useState(signos[0]);
    const[numeroUno, setNumeroUno] = useState(numeros[0]);
    const[numeroDos, setNumeroDos] = useState(numeros[10]);
    const[resultado, setResultado] = useState(`${numeroUno} ${signoActual} ${numeroDos}`);

    const [resultadoListo, setResultadoListo] = useState(false);
    const [actualNumUno, setActualNumUno] = useState(true);
    const [signoPuesto, setSignoPuesto] = useState(false);

    function escribirNum(caracter){
        if(actualNumUno && numeroUno === numeros[0]){
            setNumeroUno(caracter);
            if(caracter === numeros[11]){
                setResultado(numeros[0]+caracter);
            } else {
                setResultado(caracter);
            }
        }
        if(actualNumUno && numeroUno != numeros[0]){
            setNumeroUno(numeroUno+caracter);
            setResultado(resultado+caracter);
        }
        
        if(!actualNumUno){
            setNumeroDos(numeroDos+caracter);
            setResultado(resultado+caracter);
        }
    }

    function escribirSig(caracter){
        if(!signoPuesto){
            setSignoActual(caracter);
            setResultado(resultado+caracter);
            setActualNumUno(false);
            setSignoPuesto(true);
        } 
        if(signoPuesto && !actualNumUno){
            const borrado = resultado.slice(0, (numeroDos.length+1)*-1) + caracter;
            const nuevo = borrado + numeroDos
            setSignoActual(caracter);
            setResultado(nuevo)
        }
    }

    function borrar(caracter){
        // BORRAR CUANDO SOLO HAY UN CARACTER
        if(caracter === signos[6] && resultado.length === 1){
            setNumeroUno(numeros[0]);
            setNumeroDos(numeros[10]);
            setResultado(numeros[0]);
        }
        // BORRAR DE A UNO
        if(caracter === signos[6] && resultado.length > 1){
            const borrado = resultado.slice(0, -1);
            if(actualNumUno){
                setNumeroUno(borrado)
                setResultado(borrado)
            }
            if(signos.includes(resultado[resultado.length-1])) {
                setSignoActual(signos[0]);
                setActualNumUno(true);
                setSignoPuesto(false);
                setNumeroDos(numeros[10])
                setNumeroUno(borrado);
                setResultado(borrado);
            }
            if(!actualNumUno){
                if(numeroDos.length <= 1){
                    setNumeroDos(numeros[10]);
                }
                if(numeroDos.length > 1){
                    const indiceSigno = borrado.indexOf(signoActual);
                    setNumeroDos(resultado.slice(indiceSigno, -1));
                }
                setResultado(borrado)
            }
        }
        //BORRAR TODO
        if(caracter === signos[9]){
            setNumeroUno(numeros[0])
            setNumeroDos(numeros[10]);
            setSignoActual(signos[0]);
            setActualNumUno(true);
            setSignoPuesto(false);
            setResultadoListo(false);
            setResultado(numeros[0])
        }
    }

    function calcular(caracter){
        // CALCULOS
        if(caracter === signos[1]){
            if(signoActual === signos[5] && numeroDos === numeros[0]){
                setNumeroUno('');
                setNumeroDos('');
                setSignoActual('');
                setResultado(dividirEnCero);
            }
            const nUno = numeroUno*1;
            const nDos = numeroDos*1;
            if(signoActual === signos[2]){setResultado((nUno+nDos)+''); setNumeroUno((nUno+nDos)+'');}
            if(signoActual === signos[3]){setResultado((nUno-nDos)+''); setNumeroUno((nUno-nDos)+'');}
            if(signoActual === signos[4]){setResultado((nUno*nDos)+''); setNumeroUno((nUno*nDos)+'');}
            if(signoActual === signos[5]){setResultado((nUno/nDos)+''); setNumeroUno((nUno/nDos)+'');}
            if(signoActual === signos[8]){setResultado((nUno*nDos/100)+''); setNumeroUno((nUno%nDos)+'');}

            setNumeroDos(numeros[10]);
            setSignoActual(signos[0]);
            setActualNumUno(true);
            setSignoPuesto(false);
            setResultadoListo(true);
        }

        // MAS MENOS
        if(caracter === signos[7]){
            if(actualNumUno){
                setNumeroUno(numeroUno*-1+'');
                setResultado(numeroUno*-1+'');
            }
            if(signoPuesto){
                setNumeroUno(numeroUno*-1+'');
                setResultado((numeroUno*-1+'') + (signoActual));
            }
            if(!actualNumUno){
                setNumeroDos(numeroDos*-1+'');
                const borrado = resultado.slice(0, (numeroDos.length)*-1);
                const nuevo = borrado + (numeroDos*-1+'');
                setResultado(nuevo);
            }
        }
        if(signoActual === '+'){
            setResultado('5')
        }
    }

    return(
        <section className="calculadora">
            <div className="calculadora-cuerpo">
                <div className="pantalla">
                    <div className="resultado">
                        {resultado}
                    </div>
                </div>

                <div className="teclas">
                    <button className="tecla" onClick={()=>borrar(signos[9])}>AC</button>
                    <button className="tecla" onClick={()=>escribirSig(signos[8])}>%</button>
                    <button className="tecla" onClick={()=>calcular(signos[7])}>±</button>
                    <button className="tecla" onClick={()=>borrar(signos[6])}>⌫</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[1])}>1</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[2])}>2</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[3])}>3</button>
                    <button className="tecla" onClick={()=>escribirSig(signos[5])}>/</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[4])}>4</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[5])}>5</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[6])}>6</button>
                    <button className="tecla" onClick={()=>escribirSig(signos[4])}>*</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[7])}>7</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[8])}>8</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[9])}>9</button>
                    <button className="tecla" onClick={()=>escribirSig(signos[3])}>-</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[0])} tabIndex={0}>0</button>
                    <button className="tecla" onClick={()=>escribirNum(numeros[11])}>,</button>
                    <button className="tecla" onClick={()=>calcular(signos[1])}>=</button>
                    <button className="tecla" onClick={()=>escribirSig(signos[2])}>+</button>
                </div>
            </div>
        </section>
    )
}