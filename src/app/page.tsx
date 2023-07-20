import Calculadora from '../app/Componentes/Calculadora.js';
import Image from 'next/image.js';
import web from '../app/img/webico.png';
import repo from '../app/img/github.png';

export default function Home() {
  return (
    <main>
      <div className='info'>
        <div className='web'>
          <a href='https://calelsprumont.web.app/' target='_blank' rel="noopener noreferrer">
            <Image className='img-info' src={web} alt='calelsprumont.web.app' loading='lazy' width={50}></Image>
          </a>
        </div>
        <div className='repo'>
          <a href='' target='_blank' rel="noopener noreferrer">
            <Image className='img-info' src={repo} alt='GitHub' width={50}></Image>
          </a>
        </div>
      </div>
      <Calculadora />
    </main>
  )
}
