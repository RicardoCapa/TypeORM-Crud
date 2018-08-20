import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import {Routes} from "./routes";
import {Persona} from "./entity/Persona";
import {Delito} from "./entity/Delito";
import * as path from "path";
import {NextFunction, Request, Response} from "express";

createConnection().then(async connection => {
    // create express app

    const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({extended: true}));
    // app.use(bodyParser.urlencoded({extended: true}));

    // app.use('/', indexRoutes);


    // register express routes from defined application routes
    Routes.forEach(route => {
      console.log(route);
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);

            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? route.executeOnCall(res, result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    // setup express app here
    // ...
    // start express server
    app.listen(3000);
  /*  await connection.manager.save(connection.manager.create(Persona, {
        nombre    : "Luis",
        apellido: "Quito",
        cedula:"1150869368",
        genero: "Masculino",
        edad: 20
    }));*/
    /*await connection.manager.save(connection.manager.create(Delito, {
        tipo_delito: "Homicidio",
        descripcion:"Homicidio con arma blanca",
        circuito: "Valle",
        caton: "Loja",
        barrio: "Menfis"
    }));*/
/*    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Homicidios)
        .where("id = :id", { id: 1 })
        .execute();*/
/*    await getConnection()
        .createQueryBuilder()
        .update(Homicidios)
        .set({zona    : "Zona 8",
        tipo_muerte: "Femicidio",
        canton:"Quito",
        edad: 25  })
        .where("id = :id", { id: 2 })
        .execute();*/
        /*const persona1 = new Persona();
        persona1.nombre = "Angel";
        persona1.apellido ="Capa";
        persona1.cedula ="1122445566";
        persona1.genero ="Masculino";
        persona1.edad =20;
        await connection.manager.save(persona1);

        const persona2 = new Persona();
        persona2.nombre = "Luis";
        persona2.apellido ="Quito";
        persona2.cedula ="1122445566";
        persona2.genero ="Masculino";
        persona2.edad =30;
        await connection.manager.save(persona2);

        const delito = new Delito();
        delito.tipo_delito ="Homicidio",
        delito.descripcion="Arma Blanca",
        delito.circuito="San Sebastian",
        delito.canton="Loja",
        delito.barrio="Pradera",
        delito.persona = [persona1];
        await connection.manager.save(delito);

        const delito1= new Delito();
        delito1.tipo_delito ="Homicidio",
        delito1.descripcion="Armma de Fuego",
        delito1.circuito="Valle",
        delito1.canton="Loja",
        delito1.barrio="Pradera",
        delito1.persona = [persona2];
        await connection.manager.save(delito1);*/


        /*const delito = await connection
        .getRepository(Delito)
        .createQueryBuilder("delito")
        .leftJoinAndSelect("delito.persona", "persona")
        .getMany();
        console.log(delito);*/
        /*const loadedPhoto = await connection
        .getRepository(Delito)
        .findOne(1, { relations: ["persona"] });
        console.log(loadedPhoto);*/
    console.log("Express server has started on port 3000. Open localhost:3000/perosnas to see results");
}).catch(error => console.log(error));
