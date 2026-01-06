import { useState, useEffect } from 'react';

export default function FetchData() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.trim().length < 2) {
           setSuggestions([]);
            return;
        }

        setLoading(true);
        
        // Replace with your actual API endpoint
        fetch(`/api/products/search?q=${encodeURIComponent(searchTerm)}`)
            .then(res => res.json())
            .then(data => setSuggestions(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));

    }, [searchTerm]);

    const handleSelect = (product) => {
        setSearchTerm(product.name);
        setSuggestions([]);
        // Handle product selection here
    };

    return (
        <header className="header">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                
                {loading && <div className="loader">Loading...</div>}
                
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((product) => (
                            <li key={product.id} onClick={() => handleSelect(product)}>
                                {product.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}