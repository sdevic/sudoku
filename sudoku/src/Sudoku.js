import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

function Sudoku (){
    let [num]=useState([1,2,3,4,5,6,7,8,9].sort(()=>(Math.random() - 0.5)))//mexclo numeros que van a integrar las posiciones de cada fila
    // Sorteo que casilleros van a estar ocultos y cuales no
    let [colores]=useState(["transparent","transparent","transparent","transparent","transparent","transparent","black","black","black","black"].sort(()=>(Math.random() - 0.5)))
    let [bloques]=useState(["uno","dos","tres"].sort(()=>(Math.random() - 0.5)))
    let [bloqueUno]=useState([1,2,3].sort(()=>(Math.random() - 0.5)))//Sorteo el lugar que ocupa cada fila en el primer bloque
    let [bloqueDos]=useState([1,2,3].sort(()=>(Math.random() - 0.5)))//Sorteo el lugar que ocupa cada fila en el segundo bloque
    let [bloqueTres]=useState([1,2,3].sort(()=>(Math.random() - 0.5)))//Sorteo el lugar que ocupa cada fila en el tercer bloque
    let [contar,setContar]=useState(0)
    
   
    //Cuando el bloque no sea el de abajo le borro el borde de abajo para que no se duplique con el borde superior del cuadrante inferior
    useEffect(()=>{
        if(bloques[0]!=='tres'){document.getElementById('Uno').style.borderBottomWidth="0em"}
        if(bloques[1]!=='tres'){document.getElementById('Dos').style.borderBottomWidth="0em"}
        if(bloques[2]!=='tres'){document.getElementById('Tres').style.borderBottomWidth="0em"}
        
      
    },[bloques])

    /*Cuando entro en el casillero borro el numero del value para que no se vea si el casillero esta vacio,
     si esta lleno busco busco las coincidencias y las resalto para facilitar la vision del juego */
    const enFoco  =(e)=> {
        e.preventDefault();
        //busco si el casillero tiene un valor correcto
        if((e.target.style.color === "black")|| (e.target.style.color === "blue")){
            // traigo los inputs y todos sus atributos           
            let casilleros = document.getElementsByTagName('input')
            let atributos = Array.from(casilleros)
            //Busco todos los casilleron con el mismo contenido y si estan visibles los resalto para ayudar con la vision del juego            
            atributos.forEach(elemento=>{
                if((elemento.value ===e.target.value) && ((elemento.style.color === "black")||(elemento.style.color === "blue"))){
                    elemento.style.borderBlockColor="red"
                    elemento.style.backgroundColor="skyblue"
                    elemento.readOnly =true
                                   
                }})
            
        //si no tiene valor o no tiene un valos correcto, borro el valor existente         
        }else{
            e.target.value="";
            e.target.style.color ="gray"
        }
        console.log("entro")
    };
    const controlNumero = (e)=>{
        e.preventDefault();
        e.target.max="9"
        
        console.log(e.target.value)

    }

    // Cuando saco del foco del input hago varios chequeos y modificaciones, depende si el valor ya existia por default o si fue un valor ingrsado por el usuario
    const fueraFoco  =(e)=> {
            
        e.preventDefault();
        
        console.log("salio")
        let verificador = 0 // creo esta variable para saber si complete el juego  
        // traigo los inputs y todos sus atributos
        let casilleros = document.getElementsByTagName('input')
        let atributos = Array.from(casilleros)
        console.log(atributos)
        /*Si el atributo ensta en solo lectura(es decir que el valor estaba predeterminado) vuelvo transparente 
        los fondos de color de todos los numeros que ya estan acertados y le hice foco para señalarlos*/
        if(e.target.readOnly === true ){
                                      
                atributos.forEach(elemento=>{
                    if(elemento.value === e.target.value ){
                       elemento.style.backgroundColor="transparent"
                           
                    }})
          // en caso contrario controlo que el valor ingresado contra el valor default 
        }else{
            // si es igual le cambio el color a azul , sino a rojo  y le sumo un error
            if(e.target.value===e.target.defaultValue){
                e.target.style.color ="blue"
            }else{
                e.target.style.color ="red"
                setContar(contar++)
            }
        }
        //controlo cada numero de cada input, sii el numero es correcto le sumo al verificador
        atributos.forEach(elemento=>{
            if(elemento.style.color === "blue" ||elemento.style.color === "black"  ){
              verificador++;            
         }})
            if(verificador===81){//si el verificador es igual a 81(cantidad de inpuuts) termina el juego
                Swal.fire({
                    title: "Ganaste!!",
                    text: `Cometiste ${contar} errores`,
                    type: "success",             
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Nuevo Juego",
                }).then(ejecutar=>{
                    if(ejecutar.isConfirmed){
                        window.location.reload()
                    }})        
            }
        };
        
    return(
        
        <div className="marco">
            
            <div style={{
               gridArea: bloques[0],
            }} id="Uno">
                    <div 
                    style={{
                        order:bloqueUno[0]
                     }} className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"  max="4" style={{color:colores[0]}} defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"   style={{color:colores[1]}}  defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"   style={{color:colores[2]}} className="derecha"  defaultValue={num[2]}  />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"   style={{color:colores[3]}} defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"   style={{color:colores[4]}} defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"   style={{color:colores[5]}} className="derecha" defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"  style={{color:colores[6]}} defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"  style={{color:colores[7]}} defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco} onChange={controlNumero} type="number"  style={{color:colores[8]}} defaultValue={num[3]} />
                    </div>
                    <div 
                    style={{
                        order:bloqueUno[1]
                     }}
                    className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}}  className="derecha" defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} defaultValue={num[2]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} className="derecha" defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} defaultValue={num[7]} />
                    </div>
                    <div
                    style={{
                        order:bloqueUno[2]
                     }} className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} className="derecha" defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}} defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} className="derecha" defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} defaultValue={num[2]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} defaultValue={num[5]} /> 

                    </div>
            </div>
          
            <div
            style={{
                gridArea: bloques[1],
             }} id="Dos">
                <div 
                style={{
                    order:bloqueDos[0]
                 }}
                className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} className="derecha" defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}} defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} className="derecha" defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} defaultValue={num[2]} />
                    </div>
                    <div 
                    style={{
                        order:bloqueDos[1]
                     }}
                   
                    className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} className="derecha" defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} defaultValue={num[2]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}} defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} className="derecha" defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} defaultValue={num[1]} />
                    </div>
                    <div 
                    style={{
                        order:bloqueDos[2]
                     }}
                    className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} defaultValue={num[2]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} className="derecha" defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}} className="derecha" defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} defaultValue={num[8]} />

                    </div>
            </div>
            
            <div
            style={{
                gridArea: bloques[2],
             }}  id="Tres">
                    <div
                    style={{
                    order:bloqueTres[0]
                    }}
                    className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} className="derecha" defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}} defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} className="derecha" defaultValue={num[2]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} defaultValue={num[0]} />
                    </div>
                    <div
                    style={{
                        order:bloqueTres[1]
                     }}
                    className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} className="derecha" defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} className="derecha" defaultValue={num[4]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} defaultValue={num[2]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}} defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} defaultValue={num[6]} />
                    </div>
                    <div
                    style={{
                        order:bloqueTres[2]
                     }}
                    className="columnas">
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[7]}} defaultValue={num[1]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[5]}} defaultValue={num[2]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[0]}} className="derecha" defaultValue={num[3]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[1]}} defaultValue={num[6]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[4]}} defaultValue={num[7]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[3]}} className="derecha" defaultValue={num[0]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[2]}} defaultValue={num[8]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[8]}} defaultValue={num[5]} />
                        <input onBlur={fueraFoco} onFocus={enFoco}  style={{color:colores[6]}} defaultValue={num[4]} />

                    </div>
            </div>
        </div>
        
    )

}
export default Sudoku