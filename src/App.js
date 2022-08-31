import Students from './components/Students.jsx'

function App() {
    return (
        <>
            <nav className="navbar navbar-light bg-warning">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">Kekambas-96</span>
                </div>
            </nav>
            <div className="container">
                <Students /> {/* this is a class */}
            </div>
            
        </>
    );
}

export default App;
