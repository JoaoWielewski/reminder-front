'use client';

import SideBarBig from '@/components/SideBarBig/SideBarBig';
import Link from 'next/link';
import './styles.css';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Home() {
  const {data: session, status} = useSession();
  const router = useRouter();

  if (session) {
    router.push('/painel');
  }

  return (
    <>
      <SideBarBig></SideBarBig>
      <div className='login-signup'>
        <Link href='/login' className='login-landing'>Entrar</Link>
        <Link href='/criar-conta' className='signup-landing'>Criar conta</Link>
      </div>
      <div className='we-do'>
        <h1 className='we-do-title'>O que fazemos?</h1>
        <div className='we-do-content'>Aumentamos a quantidade de consultas e faturamento de médicos e dentistas com déficit de consultas e/ou pacientes.</div>
        <div className='we-do-content'>Ajudamos os pacientes a continuar o acompanhamento com o profissional de saúde sem atrasos, otimizando a agenda de consultas dele.</div>
      </div>
      <div className='works'>
        <div className='we-do-divider'></div>
        <div className='works-text'>
          <div className='works-title'>Como funciona?</div>
          <div className='works-content'>No fim de uma consulta, o profissional da saúde pode facilmente agendar um lembrete informando em quanto tempo deseja que o paciente retorne.</div>
          <div className='works-content'>Quando estiver próximo a data do retorno esperado o paciente automaticamente recebe uma mensagem via Whatsapp, o avisando que está na hora de agendar sua consulta e disponibilizando um botão que o direciona para o agendamento instantaneamente.</div>
          <div className='works-content'>Dessa forma, os pacientes deixam de atrasar tanto seus retornos, aumentando a quantidade de consultas do profissional da saúde.</div>
        </div>
        <Link href='/criar-conta' className='works-btn'>Começar</Link>
        <div className='we-do-image-container'>
          <div className="first-row">
            <div className='image-1'>
              <Image src={'/images/dentist.jpg'} alt={''} width={310} height={310} className='we-do-image-1'/>
            </div>
            <div className='image-2'>
              <Image src={'/images/whatsapp-hand.jpg'} alt={''} width={170} height={170} className='we-do-image-2'/>
            </div>
          </div>
          <div className='image-3'>
            <Image src={'/images/doctor.jpg'} alt={''} width={310} height={310} className='we-do-image-3'/>
          </div>
        </div>
        <div className='works-images'></div>
      </div>
      <div className='doubt'>
        <div className='doubt-title'>Alguma dúvida?</div>
        <div className='doubt-content'>Para tirar qualquer dúvida clique no botão abaixo ou escaneie o QR Code!</div>
        <a href='https://wa.link/xv58nm/' target="_blank" rel="noreferrer" className='doubt-btn'>Entrar em contato</a>
        <Image src={'/images/whatsapp.png'} alt={''} width={150} height={150} className='qr-code-doubt'/>
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
