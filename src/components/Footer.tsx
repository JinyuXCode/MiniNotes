// footer 主要用于展示版权信息和其他静态内容

function Footer() {

    // FooterStyle
    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '20px 0',
        position: 'fixed',
        bottom: 0,
        width: '100%',

        zIndex: 1000,
        color: '#555',
        fontSize: '14px',

        
    }

  return (
    <footer style={ footerStyle }>
      <p>© {new Date().getFullYear()} MiniNotes. All rights reserved.</p>
      <p>
        Made with ❤️ by  <a href="https://github.com/JinyuXCode" target="_blank" rel="noopener noreferrer">JinyuXCode</a>
    </p>
    </footer>
    );
}

export default Footer;
             