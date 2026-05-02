import React, { useState } from "react";
import '../styles/BakeACake.css';
import { useCart } from '../context/CartContext';

const cakeImages = {
    vanilla_fruit: require('../assets/cake_vanilla.png'),
    vanilla_sprinkles: require('../assets/cake_unicorn.png'),
    strawberry_fruit: require('../assets/cake_rainbow.png'),
    strawberry_sprinkles: require('../assets/cake_redvelvet.png'),
    chocolate_fruit: require('../assets/cake_strawberry.png'),
    chocolate_sprinkles: require('../assets/cake_chocolate.png'),
    vanilla_double: require('../assets/cake_double_01.png'),
    strawberry_double: require('../assets/cake_double_02.png'),
    blueberry_double: require('../assets/cake_double_03.png'),
    mint_double: require('../assets/cake_double_04.png'),
};

const steps = ['Layers', 'Flavor', 'Topping', 'Message'];

function BakeACake() {
    const [step, setStep] = useState(1);
    const [layers, setLayers] = useState(null);
    const [flavor, setFlavor] = useState(null);
    const [topping, setTopping] = useState(null);
    const [baking, setBaking] = useState(false);
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');
    const [added, setAdded] = useState(false);

    const singleFlavors = ['vanilla', 'strawberry', 'chocolate'];
    const doubleFlavors = ['vanilla', 'strawberry', 'blueberry', 'mint'];
    const singleToppings = ['fruit', 'sprinkles'];

    const { addToCart } = useCart();

    const getFlavorEmoji = (f) => {
        const emojis = { vanilla: '🍦', strawberry: '🍓', chocolate: '🍫', blueberry: '🫐', mint: '🌿' };
        return emojis[f] || '🎂';
    };

    const handleBake = () => {
        setBaking(true);
        setTimeout(() => {
            setBaking(false);
            if (layers === 1) {
                setResult(cakeImages[`${flavor}_${topping}`]);
            } else {
                setResult(cakeImages[`${flavor}_double`]);
            }
        }, 1800);
    };

    const handleReset = () => {
        setStep(1);
        setLayers(null);
        setFlavor(null);
        setTopping(null);
        setResult(null);
        setBaking(false);
        setMessage('');
    };

    return (
        <div className="bake-page">

            {/* twinkling stars */}
            <div className="star" style={{top:'4%',left:'5%',animationDuration:'2.1s'}}>✦</div>
            <div className="star" style={{top:'8%',left:'20%',animationDuration:'3.2s',fontSize:'7px'}}>✦</div>
            <div className="star" style={{top:'3%',left:'70%',animationDuration:'2.7s',fontSize:'14px'}}>✦</div>
            <div className="star" style={{top:'6%',left:'88%',animationDuration:'1.9s'}}>✦</div>
            <div className="star" style={{top:'50%',left:'2%',animationDuration:'3.1s'}}>✦</div>
            <div className="star" style={{top:'55%',left:'96%',animationDuration:'2.4s'}}>✦</div>

            <h1 className="bake-title">✨ Bake a Cake ✨</h1>

            {/* result screen */}
            {result ? (
                <div className="result-screen">
                    <div className="bg-star" style={{top:'5%',left:'8%',fontSize:'8px',animationDuration:'2.1s'}}>✦</div>
                    <div className="bg-star" style={{top:'10%',left:'80%',fontSize:'6px',animationDuration:'3.2s'}}>✦</div>
                    <div className="bg-star" style={{top:'80%',left:'5%',fontSize:'10px',animationDuration:'2.7s'}}>✦</div>
                    <div className="bg-star" style={{top:'85%',left:'88%',fontSize:'7px',animationDuration:'1.9s'}}>✦</div>
                    <div className="bg-star" style={{top:'50%',left:'3%',fontSize:'8px',animationDuration:'3.5s'}}>✦</div>
                    <div className="bg-star" style={{top:'45%',left:'93%',fontSize:'6px',animationDuration:'2.3s'}}>✦</div>

                    <p className="result-section-label">✦ your creation ✦</p>
                    <h2 className="result-main-title">Your Magical Cake<br/>is Ready! 🎂</h2>

                    <div className="cake-wrap">
                        <div className="cake-ring"></div>
                        <div className="cake-ring-2"></div>

                  
                       <img 
                            src={result} 
                            alt="Your cake" 
                            className={`result-img ${layers === 2 ? 'result-img-double' : ''}`}
                        />
                        <span className="floating-star fs1">✨</span>
                        <span className="floating-star fs2">⭐</span>
                        <span className="floating-star fs3">💫</span>
                        <span className="floating-star fs4">✨</span>
                        <span className="floating-star fs5">⭐</span>
                        <span className="floating-star fs6">💫</span>
                    </div>

                    <p className="result-details">
                        {flavor} cake · {layers === 1 ? topping : 'chocolate sauce'} · {layers} layer{layers > 1 ? 's' : ''}
                    </p>

                    {message && (
                        <div className="result-scroll">
                            <div className="scroll-label">💌 your message</div>
                            <div className="scroll-msg">"{message}"</div>
                        </div>
                    )}

                    <div className="result-divider"></div>

                    <div className="result-buttons">
                        <button 
                            className="add-cart-btn"
                            onClick={() => {
                                addToCart({
                                    id: `cake_${flavor}_${layers}_${topping}_${Date.now()}`,
                                    name: `${flavor} cake`,
                                    description: `${layers} layer cake with ${layers === 1 ? topping : 'chocolate sauce'}${message ? ` — "${message}"` : ''}`,
                                    price: layers === 1 ? '$8.00' : '$12.00',
                                    img: result,
                                    image: `cake_${flavor}_${layers === 1 ? topping : 'double'}.png`,
                                    quantity: 1,
                                    isCustomCake: true,
                                    flavor,
                                    layers,
                                    topping: layers === 1 ? topping : 'chocolate sauce',
                                    message
                                });
                                setAdded(true);
                                setTimeout(() => setAdded(false), 3000);
                            }}
                        >
                            {added ? '✅ Added to Cart!' : 'Add to Cart 🛒'}
                        </button>
                        <button className="bake-again-btn" onClick={handleReset}>Bake Again ✨</button>
                    </div>
                </div>
            ) : (
                <div className="wizard">
                    {/* step indicators */}
                    <div className="steps">
                        {steps.map((s, i) => (
                            <React.Fragment key={s}>
                                <div className={`step-circle ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : 'inactive'}`}>
                                    {step > i + 1 ? '✓' : i + 1}
                                </div>
                                {i < steps.length - 1 && <div className="step-line" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="wizard-card">

                        {/* Step 1 - Layers */}
                        {step === 1 && (
                            <div className="wizard-step">
                                <p className="step-title">✦ How many layers?</p>
                                <div className="options">
                                    <button className={`option-btn ${layers === 1 ? 'selected' : ''}`}
                                        onClick={() => { setLayers(1); setFlavor(null); setTopping(null); }}>
                                        🎂 1 Layer
                                    </button>
                                    <button className={`option-btn ${layers === 2 ? 'selected' : ''}`}
                                        onClick={() => { setLayers(2); setFlavor(null); setTopping(null); }}>
                                        🎂🎂 2 Layers
                                    </button>
                                </div>
                                <button className="next-btn" disabled={!layers} onClick={() => setStep(2)}>
                                    Next →
                                </button>
                            </div>
                        )}

                        {/* Step 2 - Flavor */}
                        {step === 2 && (
                            <div className="wizard-step">
                                <p className="step-title">✦ Choose your flavor</p>
                                <div className="options">
                                    {(layers === 1 ? singleFlavors : doubleFlavors).map(f => (
                                        <button key={f} className={`option-btn ${flavor === f ? 'selected' : ''}`}
                                            onClick={() => setFlavor(f)}>
                                            {getFlavorEmoji(f)} {f.charAt(0).toUpperCase() + f.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                <div className="nav-buttons">
                                    <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
                                    <button className="next-btn" disabled={!flavor} onClick={() => setStep(3)}>Next →</button>
                                </div>
                            </div>
                        )}

                        {/* Step 3 - Topping or Sauce */}
                        {step === 3 && (
                            <div className="wizard-step">
                                <p className="step-title">
                                    {layers === 1 ? '✦ Choose your topping' : '✦ Chocolate sauce will be added! 🍫'}
                                </p>
                                <div className="options">
                                    {layers === 1 ? singleToppings.map(t => (
                                        <button key={t} className={`option-btn ${topping === t ? 'selected' : ''}`}
                                            onClick={() => setTopping(t)}>
                                            {t === 'fruit' ? '🍓 Fruit' : '✨ Sprinkles'}
                                        </button>
                                    )) : (
                                        <div className="sauce-info">
                                            🍫 Your cake will be drizzled with rich chocolate sauce!
                                        </div>
                                    )}
                                </div>
                                <div className="nav-buttons">
                                    <button className="back-btn" onClick={() => setStep(2)}>← Back</button>
                                    <button className="next-btn"
                                        disabled={layers === 1 && !topping}
                                        onClick={() => setStep(4)}>
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4 - Message */}
                        {step === 4 && (
                            <div className="wizard-step">
                                <p className="step-title">✦ Add a message to your cake?</p>
                                <textarea
                                    className="message-input"
                                    placeholder="e.g. Happy Birthday! 🎂"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={50}
                                />
                                <p className="message-count">{message.length}/50</p>
                                <div className="nav-buttons">
                                    <button className="back-btn" onClick={() => setStep(3)}>← Back</button>
                                    <button className="next-btn" onClick={handleBake}>
                                        🎂 Bake!
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* baking effect */}
                        {baking && (
                            <div className="baking-overlay">
                                <div className="poof">
                                    <span>✨</span><span>⭐</span><span>💫</span>
                                    <span>🌟</span><span>✨</span><span>⭐</span>
                                    <span>💫</span><span>🌟</span><span>✨</span>
                                </div>
                                <p className="baking-text">Baking your magical cake...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BakeACake;