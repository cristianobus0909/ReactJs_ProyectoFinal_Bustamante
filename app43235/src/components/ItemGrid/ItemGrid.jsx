

const ItemGrid = ({ products }) => {
    return (
        <div style={{ display: 'flex', textTransform:'uppercase'  }}>
            {
                products.map(prod => {
                    return <h1 key={prod.id}>{prod.name}</h1>
                })
            }
        </div>
    )
}

export default ItemGrid