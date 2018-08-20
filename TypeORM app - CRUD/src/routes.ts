import {PersonaControlador} from "./controller/Controlador";
import {DelitoControlador} from "./controller/Controlador";
import * as express from "express";


/*router.get('/prueba', async (req, res) => {
  const mod = await personaRepository.find();
  console.log(mod);
  res.render('test', {mod});
});*/
export const Routes = [{
    method: "get",
    route: "/personas",
    controller: PersonaControlador,
    action: "all",
    executeOnCall: function(res, data){
      res.render('test', {data: data})
    }
},{
  method: "get",
  route: "/delitos",
  controller: DelitoControlador,
  action: "all",
  executeOnCall: function(res, data){
    res.render("DelitoTabla", {data: data})
  }
},{
  method: "post",
  route: "/persona/busqueda",
  controller: PersonaControlador,
  action: "busqueda",
  executeOnCall: function(res, data){
    res.render("test", {data: data})
  }
},{
  method: "post",
  route: "/delito/busqueda",
  controller: DelitoControlador,
  action: "busquedaDelito",
  executeOnCall: function(res, data){
    res.render("DelitoTabla", {data: data})
  }
}, {
  method: "post",
  route: "/persona/add",
  controller: PersonaControlador,
  action: "agregarPersona",
  executeOnCall: function(res, data){
      res.redirect('/personas');
  }
},{
  method: "get",
  route: "/persona/eliminar/:id",
  controller: PersonaControlador,
  action: "eliminarPersona",
  executeOnCall: function(res, data){
    res.redirect('/personas');
  }
},{
  method: "get",
  route: "/delito/eliminar/:id",
  controller: DelitoControlador,
  action: "eliminaDelito",
  executeOnCall: function(res, data){
    res.redirect('/delitos');
  }
},{
  method: "get",
  route: "/delito/:id",
  controller: DelitoControlador,
  action: "unDelito",
  executeOnCall: function(res, data){
    console.log("Delitos: ",data);
    res.render("DelitoTabla", {data: [data]})
  }
},{
  method: "get",
  route: "/persona/:id",
  controller: PersonaControlador,
  action: "unaPersona",
  executeOnCall: function(res, data){
    console.log("Delitos: ",data);
    res.render("test", {data: [data]})
  }
},{
  method: "get",
  route: "/mostrarPersona/:id",
  controller: PersonaControlador,
  action: "mostrarPersona",
  executeOnCall: function(res, data){
    // console.log("Delitos: ",data);
    res.render("editarPersona", {data: data})
  }
},{
  method: "post",
  route: "/editarPersona/:id",
  controller: PersonaControlador,
  action: "editarPersona",
  executeOnCall: function(res, data){
    // console.log("Delitos: ",data);
    res.redirect("/personas")
  }
},{
  method: "get",
  route: "/mostrarDelito/:id",
  controller: DelitoControlador,
  action: "mostrarDelito",
  executeOnCall: function(res, data){
    // console.log("Delitos: ",data);
    res.render("editarDelito", {data: data})
  }
},{
  method: "post",
  route: "/editarDelito/:id",
  controller: DelitoControlador,
  action: "editarDelito",
  executeOnCall: function(res, data){
    // console.log("Delitos: ",data);
    res.redirect("/delitos")
  }
},{
  method: "post",
  route: "/delito/add",
  controller: DelitoControlador,
  action: "agregarDelito",
  executeOnCall: function(res, data){
      res.redirect('/delitos');
  }
}];
