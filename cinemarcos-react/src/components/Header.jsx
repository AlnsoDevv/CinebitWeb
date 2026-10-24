import './Header.css';

function Header ({ searchTerm, onSearchChange }){

return (<header>
        <a href="/"><img src="src/Images/Logo.png" width="175px" alt="LogoCineMarcos" /></a>
        <nav>
            <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
                <input type="text" name="search" id="search" placeholder="Busca una película.." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
            </form>
            <a className="profile-link" href="/perfil">Mi perfil</a>
        </nav>
    </header>);


}
export default Header;