import React from "react";
import '../styles/Desserts.css';
import { useCart } from '../context/CartContext';

const colors = ["a1", "a2", "a3", "a4", "a5", "a6"];

// Dessert Images are from Lumin Leveret's "Dessert Pack" on itch.io
// https://luminleveret.itch.io/

const pancakes = [
    { id: 1, name: "Berry Pancake", img: require('../assets/Pancakes_Berry.png'), image: "Pancakes_Berry.png", description: "Fluffy pancake topped with fresh berries", price: "$3.50"},
    { id: 2, name: "Chocolate Pancake", img: require('../assets/Pancakes_Chocolate.png'), image: "Pancakes_Chocolate.png", description: "Rich chocolate drizzled pancake", price: "$4.00"},
    { id: 3, name: "Cookies & Cream Pancake", img: require('../assets/Pancakes_CookiesnCream.png'), image: "Pancakes_CookiesnCream.png", description: "Pancake loaded with cookies and cream", price: "$4.50"},
    { id: 4, name: "Cream Pancake", img: require('../assets/Pancakes_Cream.png'), image: "Pancakes_Cream.png", description: "Light and fluffy cream pancake", price: "$3.00"},
    { id: 5, name: "Mint Chocolate Pancake", img: require('../assets/Pancakes_MintChocolate.png'), image: "Pancakes_MintChocolate.png", description: "Refreshing mint chocolate pancake", price: "$4.50"},
    { id: 6, name: "Rainbow Pancake", img: require('../assets/Pancakes_Rainbow.png'), image: "Pancakes_Rainbow.png", description: "Colorful and magical rainbow pancake", price: "$5.00"},
];

const baked_goods = [
    { id: 7, name: "Croissant", img: require('../assets/Croissant.png'), image: "Croissant.png", description: "Buttery flaky classic croissant", price: "$3.50"},
    { id: 8, name: "Croissant Sandwich", img: require('../assets/CroissantSandwich.png'), image: "CroissantSandwich.png", description: "Savory filled croissant sandwich", price: "$5.00"},
    { id: 9, name: "Croissant Avocado Toast", img: require('../assets/CroissantAvocadoSandwich.png'), image: "CroissantAvocadoSandwich.png", description: "Croissant topped with fresh avocado", price: "$5.00"},
    { id: 10, name: "Strawberry Waffles", img: require('../assets/StrawberryWaffles.png'), image: "StrawberryWaffles.png", description: "Crispy waffles with fresh strawberries", price: "$5.00"},
    { id: 11, name: "Ice Cream Waffles", img: require('../assets/IceCreamWaffles.png'), image: "IceCreamWaffles.png", description: "Warm waffles topped with ice cream", price: "$5.00"},
    { id: 12, name: "Berry Waffles", img: require('../assets/BerryWaffles.png'), image: "BerryWaffles.png", description: "Crispy waffles loaded with berries", price: "$5.00"},
];

const small_cakes = [
    { id: 13, name: "Lemon Danish", img: require('../assets/DanishGlazed2.png'), image: "DanishGlazed2.png", description: "Zesty lemon glazed danish pastry", price: "$3.50"},
    { id: 14, name: "Glazed Danish", img: require('../assets/DanishGlazed.png'), image: "DanishGlazed.png", description: "Classic sweet glazed danish", price: "$3.50"},
    { id: 15, name: "Swiss Roll", img: require('../assets/SwissRoll.png'), image: "SwissRoll.png", description: "Light sponge cake rolled with cream", price: "$3.50"},
    { id: 16, name: "Chocolate Swiss Roll", img: require('../assets/ChocolateSwissRoll.png'), image: "ChocolateSwissRoll.png", description: "Chocolate sponge rolled with cream", price: "$3.50"},
    { id: 17, name: "Cinnamonroll", img: require('../assets/Cinnamonroll.png'), image: "Cinnamonroll.png", description: "Soft and fluffy cinnamon roll", price: "$3.50"},
    { id: 18, name: "Glazed Cinnamonroll", img: require('../assets/GlazedCinnamonroll.png'), image: "GlazedCinnamonroll.png", description: "Cinnamon roll with sweet glaze", price: "$3.50"},
];

const jellies = [
    { id: 19, name: "Red Jelly", img: require('../assets/RedJelly.png'), image: "RedJelly.png", description: "Sweet and wobbly red jelly", price: "$3.50"},
    { id: 20, name: "Yellow Jelly", img: require('../assets/YellowJelly.png'), image: "YellowJelly.png", description: "Sweet and wobbly yellow jelly", price: "$3.50"},
    { id: 21, name: "Purple Jelly", img: require('../assets/PurpleJelly.png'), image: "PurpleJelly.png", description: "Sweet and wobbly purple jelly", price: "$3.50"},
    { id: 22, name: "Pink Jelly", img: require('../assets/PinkJelly.png'), image: "PinkJelly.png", description: "Sweet and wobbly pink jelly", price: "$3.50"},
    { id: 23, name: "Green Jelly", img: require('../assets/GreenJelly.png'), image: "GreenJelly.png", description: "Sweet and wobbly green jelly", price: "$3.50"},
    { id: 24, name: "Blue Jelly", img: require('../assets/BlueJelly.png'), image: "BlueJelly.png", description: "Sweet and wobbly blue jelly", price: "$3.50"},
];

const pots = [
    { id: 25, name: "Banoffee Pot", img: require('../assets/BanoffeePot.png'), image: "BanoffeePot.png", description: "Creamy banoffee in a cute pot", price: "$3.50"},
    { id: 26, name: "Cherry Chocolate Pot", img: require('../assets/CherryChocolatePot.png'), image: "CherryChocolatePot.png", description: "Rich cherry chocolate dessert pot", price: "$3.50"},
    { id: 27, name: "Chocolate Pot", img: require('../assets/ChocolatePot.png'), image: "ChocolatePot.png", description: "Decadent chocolate dessert pot", price: "$3.50"},
    { id: 28, name: "Raspberry Cheesecake Pot", img: require('../assets/RaspberryCheesecakePot.png'), image: "RaspberryCheesecakePot.png", description: "Creamy cheesecake with raspberry", price: "$3.50"},
    { id: 29, name: "Lemon Blueberry Pot", img: require('../assets/LemonBlueberryPot.png'), image: "LemonBlueberryPot.png", description: "Zesty lemon with blueberry pot", price: "$3.50"},
    { id: 30, name: "Mint Chocolate Pot", img: require('../assets/MintChocolatePot.png'), image: "MintChocolatePot.png", description: "Refreshing mint chocolate pot", price: "$3.50"},
];

// Each shelf section renders a label, items and a shelf board
function ShelfSection({ label, items }) {
    const { addToCart } = useCart();

    return (
        <div className="shelf-section">
            <p className="shelf-label">{label}</p>
            <div className="shelf-items">
                {items.map((item, index) => (
                    <div key={item.id} className={`item ${colors[index % colors.length]}`}>
                        <img src={item.img} alt={item.name} className="item-img" />
                        <p className="item-name">{item.name}</p>
                        <span className="price-tag">{item.price}</span>
                        <button 
                            className="add-btn"
                            onClick={() => addToCart(item)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div className="shelf-board"></div>
        </div>
    );
}

function Desserts() {

    const { cart } = useCart();

    return (
        <div className="desserts-page">
            <h1 className="desserts-title">✨ Desserts ✨</h1>

            <p>Cart items: {cart.length}</p>


            <ShelfSection label="🥞 Pancakes" items={pancakes} />
            <ShelfSection label="🥐 Baked Goods" items={baked_goods} />
            <ShelfSection label="🎂 Small Cakes" items={small_cakes} />
            <ShelfSection label="🍮 Jellies" items={jellies} />
            <ShelfSection label="🍯 Pots" items={pots} />
        </div>
    );
}

export default Desserts;