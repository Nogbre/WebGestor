import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showCurtains, setShowCurtains] = useState(false);
    const [curtainsClosed, setCurtainsClosed] = useState(false);

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("auth") === "true";
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch("https://universidad-la9h.onrender.com/auth/encargado-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo, contrasena }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message);
                return;
            }

            setShowCurtains(true);
            sessionStorage.setItem("auth", "true");
            if (!response.ok) {
                setErrorMessage(data.message);
                return;
            }

            setShowCurtains(true);
            sessionStorage.setItem("auth", "true");



            setTimeout(() => {
                setCurtainsClosed(true);
            }, 100);

        } catch (error) {
            console.error("Error al autenticar:", error);
            setErrorMessage("Error en el servidor, intente nuevamente.");
        }
    };

    useEffect(() => {
        if (curtainsClosed) {
            // Espera 2 segundos (duración de las cortinas) antes de redirigir al dashboard
            const timeout = setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [curtainsClosed, navigate]);

    return (
        <div className="relative overflow-hidden">
            {showCurtains && (
                <>

                    <div
                        className={`fixed inset-y-0 left-0 w-1/2 bg-[#592644] z-50 flex items-center justify-end transition-transform duration-[1200ms] ease-in-out ${
                            curtainsClosed ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <img
                            src="/assets/logo-left.png"
                            alt="Logo Izquierda"
                            className="max-h-40 object-contain"
                        />
                    </div>


                    <div
                        className={`fixed inset-y-0 right-0 w-1/2 bg-[#592644] z-50 flex items-center justify-start transition-transform duration-[1200ms] ease-in-out ${
                            curtainsClosed ? "translate-x-0" : "translate-x-full"
                        }`}
                    >
                        <img
                            src="/assets/logo-right.png"
                            alt="Logo Derecho"
                            className="max-h-40 object-contain"
                        />
                    </div>
                </>
            )}


            <div className="flex justify-center items-center min-h-screen bg-gray-100 transition-all duration-500">
                <div className="w-full max-w-md p-6 z-10">
                    <div className="flex justify-center mb-4">
                        <img src="/assets/logo.png" alt="Logo" className="w-34 h-34 object-contain" />
                    </div>

                    <h2 className="text-xl font-bold text-[#592644] text-center mb-1">
                        Inventario de Laboratorio
                    </h2>

                    <div className="mt-4 p-4 bg-[#59264426] rounded-xl">
                        <h4 className="text-base font-semibold mb-1">Iniciar Sesión</h4>
                        <p className="text-sm text-gray-600">Ingrese su correo institucional</p>
                    </div>

                    <div className="mt-5 space-y-3 transition-all duration-300">
                        <div>
                            <label className="block text-sm font-semibold">Correo</label>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="ejemplo@est.univalle.edu"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#592644]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold">Contraseña</label>
                            <input
                                type="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                placeholder="********"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#592644]"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}

                    <button
                        className="w-full mt-5 p-2 bg-[#592644] text-white font-bold rounded-2xl hover:bg-[#4b1f3d] transition"
                        onClick={handleLogin}
                    >
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
