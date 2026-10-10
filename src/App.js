import React, { useState } from 'react';
import './App.css';

function App() {
  const precios = {
    'Hamburguesa Simple': 9000,
    'Hamburguesa Doble': 12000,
    'Hamburguesa Triple': 15000,
    'Papas Fritas': 4000,
    'Papas al Horno': 4500,
    'Agua Mineral': 2000,
    'Gaseosa': 2500,
    'Jugo': 2500,
    'Cono de Vainilla': 1500,
    'Helado Mixto': 2000
  };

  const [pedido, setPedido] = useState({
    'Hamburguesa Simple': 0,
    'Hamburguesa Doble': 0,
    'Hamburguesa Triple': 0,
    'Papas Fritas': 0,
    'Papas al Horno': 0,
    'Agua Mineral': 0,
    'Gaseosa': 0,
    'Jugo': 0,
    'Cono de Vainilla': 0,
    'Helado Mixto': 0
  });

  const [opciones, setOpciones] = useState({
    hielo: 'No',
    aderezos: 'No'
  });

  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [ticket, setTicket] = useState(null);

  const sumar = (item) => setPedido({ ...pedido, [item]: pedido[item] + 1 });
  const restar = (item) => {
    if (pedido[item] > 0) setPedido({ ...pedido, [item]: pedido[item] - 1 });
  };

  const handleOpciones = (e) => setOpciones({ ...opciones, [e.target.name]: e.target.value });

  const subtotal = Object.keys(pedido).reduce((acc, item) => acc + (pedido[item] * precios[item]), 0);
  const descuento = metodoPago === 'efectivo' ? subtotal * 0.10 : 0;
  const total = subtotal - descuento;
  const tieneItems = subtotal > 0;

  const tieneBebida = pedido['Agua Mineral'] > 0 || pedido['Gaseosa'] > 0 || pedido['Jugo'] > 0;
  const tieneComida = pedido['Hamburguesa Simple'] > 0 || pedido['Hamburguesa Doble'] > 0 || pedido['Hamburguesa Triple'] > 0 || pedido['Papas Fritas'] > 0 || pedido['Papas al Horno'] > 0;
  const mostrarPreferencias = tieneBebida || tieneComida;

  const generarPedido = (e) => {
    e.preventDefault();
    setTicket(Math.floor(Math.random() * 1000));
  };

  const nuevoPedido = () => {
    setPedido(Object.keys(pedido).reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}));
    setOpciones({ hielo: 'No', aderezos: 'No' });
    setMetodoPago('tarjeta');
    setTicket(null);
  };

  const formatearPlata = (monto) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(monto);
  };

  return (
    <div className="contenedor-principal">
      <div className="delys-app">
        {!ticket ? (
          <div className="pantalla-kiosco">
            <div className="header-delys">
              <h1>Bienvenido a Dely's</h1>
              <p className="subtitulo">Seleccione las cantidades de su pedido</p>
            </div>

            <form onSubmit={generarPedido} className="formulario-delys">
              
              <div className="seccion-menu">
                <div className="seccion-header">
                  <h3>Hamburguesas</h3>
                </div>
                <div className="lista-opciones">
                  {['Hamburguesa Simple', 'Hamburguesa Doble', 'Hamburguesa Triple'].map(item => (
                    <div key={item} className="fila-opcion">
                      <div className="info-item">
                        <span>{item}</span>
                        <small>{formatearPlata(precios[item])}</small>
                      </div>
                      <div className="contador">
                        <button type="button" onClick={() => restar(item)}>-</button>
                        <span>{pedido[item]}</span>
                        <button type="button" onClick={() => sumar(item)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="seccion-menu">
                <div className="seccion-header">
                  <h3>Acompañamientos</h3>
                </div>
                <div className="lista-opciones">
                  {['Papas Fritas', 'Papas al Horno'].map(item => (
                    <div key={item} className="fila-opcion">
                      <div className="info-item">
                        <span>{item}</span>
                        <small>{formatearPlata(precios[item])}</small>
                      </div>
                      <div className="contador">
                        <button type="button" onClick={() => restar(item)}>-</button>
                        <span>{pedido[item]}</span>
                        <button type="button" onClick={() => sumar(item)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="seccion-menu">
                <div className="seccion-header">
                  <h3>Bebidas y Postres</h3>
                </div>
                <div className="lista-opciones">
                  {['Agua Mineral', 'Gaseosa', 'Jugo', 'Cono de Vainilla', 'Helado Mixto'].map(item => (
                    <div key={item} className="fila-opcion">
                      <div className="info-item">
                        <span>{item}</span>
                        <small>{formatearPlata(precios[item])}</small>
                      </div>
                      <div className="contador">
                        <button type="button" onClick={() => restar(item)}>-</button>
                        <span>{pedido[item]}</span>
                        <button type="button" onClick={() => sumar(item)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {mostrarPreferencias && (
                <div className="seccion-menu">
                  <div className="seccion-header">
                    <h3>Preferencias Adicionales</h3>
                  </div>
                  <div className="lista-opciones">
                    {tieneBebida && (
                      <div className="fila-opcion">
                        <span className="texto-fuerte">Hielo en bebidas</span>
                        <div className="opciones-radio">
                          <label><input type="radio" name="hielo" value="Sí" checked={opciones.hielo === 'Sí'} onChange={handleOpciones} /> Sí</label>
                          <label><input type="radio" name="hielo" value="No" checked={opciones.hielo === 'No'} onChange={handleOpciones} /> No</label>
                        </div>
                      </div>
                    )}
                    {tieneComida && (
                      <div className="fila-opcion">
                        <span className="texto-fuerte">Aderezos</span>
                        <div className="opciones-radio">
                          <label><input type="radio" name="aderezos" value="Sí" checked={opciones.aderezos === 'Sí'} onChange={handleOpciones} /> Sí</label>
                          <label><input type="radio" name="aderezos" value="No" checked={opciones.aderezos === 'No'} onChange={handleOpciones} /> No</label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="seccion-menu pago-seccion">
                <div className="seccion-header">
                  <h3>Medio de Pago</h3>
                </div>
                <div className="lista-opciones opciones-pago">
                  <label className={`caja-pago ${metodoPago === 'tarjeta' ? 'seleccionado' : ''}`}>
                    <input type="radio" name="pago" value="tarjeta" checked={metodoPago === 'tarjeta'} onChange={(e) => setMetodoPago(e.target.value)} />
                    Tarjeta / App
                  </label>
                  <label className={`caja-pago ${metodoPago === 'efectivo' ? 'seleccionado' : ''}`}>
                    <input type="radio" name="pago" value="efectivo" checked={metodoPago === 'efectivo'} onChange={(e) => setMetodoPago(e.target.value)} />
                    Efectivo (10% OFF)
                  </label>
                </div>
              </div>

              <div className="resumen-flotante">
                <div className="totales">
                  {metodoPago === 'efectivo' && (
                    <div className="descuento-info">
                      <span>Subtotal: {formatearPlata(subtotal)}</span>
                      <span>Descuento 10%: -{formatearPlata(descuento)}</span>
                    </div>
                  )}
                  <h2>Total: {formatearPlata(total)}</h2>
                </div>
                <button 
                  type="submit" 
                  className={`btn-confirmar ${tieneItems ? 'activo' : 'inactivo'}`}
                  disabled={!tieneItems}
                >
                  {tieneItems ? 'IMPRIMIR TICKET' : 'AGREGUE PRODUCTOS'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="pantalla-ticket">
            <div className="ticket-papel">
              <h2>DELY's BURGERS</h2>
              <p className="ticket-fecha">{new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</p>
              <div className="linea-punteada"></div>
              
              <h1 className="numero-pedido">PEDIDO: C{ticket}</h1>
              
              <div className="linea-punteada"></div>
              <div className="ticket-detalle">
                {Object.keys(pedido).map(item => {
                  if (pedido[item] > 0) {
                    return (
                      <div key={item} className="ticket-item">
                        <span>{pedido[item]}x {item}</span>
                        <span>{formatearPlata(pedido[item] * precios[item])}</span>
                      </div>
                    )
                  }
                  return null;
                })}
              </div>

              <div className="linea-punteada"></div>
              <div className="ticket-notas">
                <p>Pago: {metodoPago.toUpperCase()}</p>
              </div>

              <div className="linea-punteada"></div>
              <div className="ticket-totales">
                {metodoPago === 'efectivo' && (
                  <>
                    <p>Subtotal: <span>{formatearPlata(subtotal)}</span></p>
                    <p>Descuento: <span>-{formatearPlata(descuento)}</span></p>
                  </>
                )}
                <h2 className="pago-final">DEBE ABONAR: <br/>{formatearPlata(total)}</h2>
              </div>

              <div className="qr-container">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=DelysTotal${total}`} alt="QR Ticket" className="qr-code" />
              </div>
              <p className="scan-text">Presentar en caja para abonar</p>
            </div>
            
            <button onClick={nuevoPedido} className="btn-nuevo-pedido">Volver a la pantalla de inicio</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;