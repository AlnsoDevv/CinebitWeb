import './Filter.css';

function Filter({ closeFilter }) {
    return (
        <div className="filterOverlay"
             onClick={closeFilter}>

            <div className="filterPanel"
                 onClick={(event) => event.stopPropagation()}>

                <button
                    className="closeFilter"
                    onClick={closeFilter}
                >
                    X
                </button>

                <h2>Filtrar y ordenar</h2>

                <h3>Género</h3>
                <h3>Año</h3>
                <h3>Ordenar por</h3>

            </div>

        </div>
    );
}

export default Filter;