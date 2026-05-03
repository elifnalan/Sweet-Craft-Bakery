import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart')) || []
    );

    // Save cart to localStorage every time it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            setCart([]);
            localStorage.removeItem('cart');
        }
    }, []);

    const addToCart = (item) => {
        setCart(prevCart => {
            const existing = prevCart.find(i => i.id === item.id);
            if (existing) {
                return prevCart.map(i => i.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const decreaseQuantity = (id) => {
        setCart(prevCart => {
            const existing = prevCart.find(i => i.id === id);
            if (existing.quantity === 1) {
                return prevCart.filter(i => i.id !== id);
            }
            return prevCart.map(i => i.id === id
                ? { ...i, quantity: i.quantity - 1 }
                : i
            );
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}