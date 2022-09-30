function Footer() {
    const currentYear = new Date().getFullYear().toString();
  
    return (
        <footer className="footer">
            <div className="hidden font-light text-sm md:block md:self-center md:m-auto md:text-center md:p-2 ">
                <p>Copyright &#169; {currentYear} IndividualSalesTracker-14</p>
            </div>
        </footer>
    );
  }
  
  export default Footer;