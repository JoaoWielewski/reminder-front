import SideBarBig from '@/components/SideBarBig/SideBarBig';
import Link from 'next/link';
import './styles.css';
import Image from 'next/image';

function Home() {
  return (
    <>
      <SideBarBig></SideBarBig>
      <div className='login-signup'>
        <Link href='/login' className='login-landing'>Entrar</Link>
        <Link href='/criar-conta' className='signup-landing'>Criar conta</Link>
      </div>
      <div className='we-do'>
        <h1 className='we-do-title'>O que fazemos?</h1>
        <div className='we-do-content'>Possibilitamos que profissionais da saúde agendem lembretes para
serem enviados aos seus pacientes os lembrando de agendar consultas.</div>
      </div>
      <div className='works'>
        <div className='we-do-divider'></div>
        <div className='works-text'>
          <div className='works-title'>Como funciona?</div>
          <div className='works-content'>No fim de uma consulta, o profissional da saúde pode facilmente agendar um lembrete informando em quanto tempo deseja que o paciente retorne.</div>
          <div className='works-content'>Quando estiver próximo à data do retorno esperado o paciente recebe um lembrete via Whatsapp, com um botão que o direciona ao agendamento.</div>
          <div className='works-content'>Dessa forma, os pacientes deixam de atrasar tanto seus retornos, aumentando a quantidade de consultas do profissional da saúde.</div>
        </div>
        <Link href='/criar-conta' className='works-btn'>Começar</Link>
        <div className='works-images'></div>
      </div>
      <div className='doubt'>
        <div className='doubt-title'>Alguma dúvida?</div>
        <div className='doubt-content'>Para tirar qualquer dúvida clique no botão abaixo ou escaneie o QR Code!</div>
        <a href='https://wa.link/xv58nm/' target="_blank" rel="noreferrer" className='doubt-btn'>Entrar em contato</a>
        <Image src={'/images/whatsapp2.png'} alt={''} width={200} height={200} className='qr-code-doubt'/>
        <span className="absolute-top-left">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              stroke-opacity="0.08"
              stroke-width="12"
            />
          </svg>
        </span>
        <span className="absolute-bottom-right">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              stroke-opacity="0.06"
              stroke-width="13"
            />
          </svg>
        </span>
      </div>
    </>
  );
}

export default Home;
