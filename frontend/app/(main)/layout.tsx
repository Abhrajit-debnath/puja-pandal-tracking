import HeaderMain from "../../components/layout/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen">
      <HeaderMain showBgColor={true} pageTitle="Live Immersion" />
       <main className="pt-20 sm:pt-24 pb-12">                                                                                 
            {children}                                                                                                            
          </main> 
    </div>
  );
};

export default MainLayout;
