import { createContext, useState, useContext } from 'react';

// Creates an empty context 
const CartContext = createContext();

export function CartProvider({ children }) {
    // cart is array of items, starts empty
    const [cart, setCart] = useState([]);

   const addToCart = (item) => {
    setCart(prevCart => {
        console.log('Cart before:', prevCart);
        console.log('Adding item id:', item.id);
        
        const existing = prevCart.find(i => i.id === item.id);
        console.log('Found existing:', existing);
        
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
        // Remove item from cart by filtering it out using its id
        setCart(cart.filter(i => i.id !== id));
    };

    // Empty the entire cart
    const clearCart = () => setCart([]);

    const decreaseQuantity = (id) => {
    setCart(prevCart => {
        const existing = prevCart.find(i => i.id === id);
        if (existing.quantity === 1) {
            // If quantity is 1, remove it completely
            return prevCart.filter(i => i.id !== id);
        }
        // Otherwise just decrease by 1
        return prevCart.map(i => i.id === id 
            ? { ...i, quantity: i.quantity - 1 } 
            : i
        );
    });
};

    return (
        // Makes cart and functions available to ALL pages/components
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook so any component can easily access the cart
export function useCart() {
    return useContext(CartContext);
}