import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Inicio } from './components/Inicio';
import { Municipio } from './components/Municipio';
import { Transparencia } from './components/Transparencia';
import { Obras } from './components/Obras';
import { Contacto } from './components/Contacto';
import { AdminPanel } from './components/AdminPanel';
import { AdminMunicipal } from './components/AdminMunicipal';
import { Tramites } from './components/Tramites';
import { Atencion } from './components/Atencion';
import { DirectorioComercial } from './components/DirectorioComercial';

const App: React.FC = () => {
  const [currentTab, setTab] = useState<string>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Detect ?admin=true query parameter on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsAdminMode(true);
        console.log("Modo Administrador activado mediante URL.");
      }
    } catch (err) {
      console.error("Error reading URL search params:", err);
    }
  }, []);

  // Set slim header state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headerElement = document.querySelector('.header');
      if (headerElement) {
        if (window.scrollY > 50) {
          headerElement.classList.add('slim');
        } else {
          headerElement.classList.remove('slim');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case 'inicio':
        return <Inicio setTab={setTab} />;
      case 'municipio':
      case 'municipio-conoce':
        return <Municipio />;
      case 'municipio-admin':
        return <AdminMunicipal />;
      case 'municipio-tramites':
        return <Tramites />;
      case 'municipio-atencion':
        return <Atencion setTab={setTab} />;
      case 'municipio-directorio':
        return <DirectorioComercial />;
      case 'transparencia':
        return <Transparencia />;
      case 'obras':
        return <Obras />;
      case 'contacto':
        return <Contacto />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Inicio setTab={setTab} />;
    }
  };

  return (
    <>
      <Header
        currentTab={currentTab}
        setTab={setTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isAdminMode={isAdminMode}
      />
      <main>
        <div className="container">
          {renderContent()}
        </div>
      </main>
      <Footer 
        setTab={setTab} 
        isAdminMode={isAdminMode} 
        setIsAdminMode={setIsAdminMode} 
      />
    </>
  );
};

export default App;
