import Students from './components/Students.jsx'

function App() {
    return (
        <>
            <nav class="navbar navbar-light bg-warning">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">Kekambas-96</span>
                </div>
            </nav>
            <div class="container">
                <Students /> {/* this is a class */}
            </div>
            
        </>
    );
}

export default App;
