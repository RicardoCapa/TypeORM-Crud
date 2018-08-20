import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Persona} from "../entity/Persona";
import {Delito} from "../entity/Delito";
import { MoreThan } from  "typeorm" ;
import {LessThan} from "typeorm";
import {Like} from "typeorm";
import {getConnection} from "typeorm";

export class PersonaControlador {

    private personaRepository = getRepository(Persona);
    async all(request: Request, response: Response, next: NextFunction) {
        return this.personaRepository.find();
    }
    async unaPersona(request: Request, response: Response, next: NextFunction) {
        return this.personaRepository.findOne(request.params.id);
    }
    async mostrarPersona(request: Request, response: Response, next: NextFunction) {
        const model =await this.personaRepository.findOne(request.params.id);
        // console.log("Modelo: ",request);
      return model;

    }
    async editarPersona(request: Request, response: Response, next: NextFunction) {
      return await getConnection()
          .createQueryBuilder()
          .update(Persona)
          .set(request.body)
          .where("id = :id", { id: request.params.id })
          .execute();
        // const model =await this.personaRepository.update(request.body);
        // console.log("Modelo: ",request.body);
      // return model;

    }

    async agregarPersona(request: Request, response: Response, next: NextFunction) {
        var a = request.body;
        return await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Persona)
          .values(request.body)
          .execute();

        // return this.personaRepository.save(a);
    }
    async eliminarPersona(request: Request, response: Response, next: NextFunction) {
      // await this.personaRepository.remove(request.params.id);
        var id = request.params.id;
        return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Persona)
        .where("id = :id", {id:id})
        .execute();
    }
    // async busqueda(request: Request, response: Response, next: NextFunction) {
    //   var query =request.body;
    //   console.log(query);
    //   return this.personaRepository.find(query);
    //
    // }

    async datos(request: Request, response: Response, next: NextFunction) {
      return this.personaRepository.find({ select: ["nombre", "apellido"] });
    }
    async busqueda(request: Request, response: Response, next: NextFunction) {
      var query = request.body.edad
      return this.personaRepository.find({edad: MoreThan(query)});
    }
    async menor(request: Request, response: Response, next: NextFunction) {
        return this.personaRepository.find({edad: LessThan(25)});
    }

}



export class DelitoControlador {

    private delitoRepository = getRepository(Delito);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.delitoRepository.find({ relations: ["persona"] });
    }

    async unDelito(request: Request, response: Response, next: NextFunction) {
      return this.delitoRepository.findOne(request.params.id);
      // console.log("Aqui: ",query.tipo_delito);
      // return this.delitoRepository.find(query.tipo_delito);
      // return await getConnection()
      // .createQueryBuilder()
      // .select("tipo_delito")
      // .from(Delito, "delito")
      // .where("delito.tipo_delito = :tipo_delito", { tipo_delito: query })
      // .getOne();
        // return this.delitoRepository.findOne(request.params.id, { relations: ["persona"] });
    }

    async agregarDelito(request: Request, response: Response, next: NextFunction) {
      var i = request.body;
      console.log(i);
      return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Delito)
        .values(request.body)
        .execute();
    }
    async mostrarDelito(request: Request, response: Response, next: NextFunction) {
        const model =await this.delitoRepository.findOne(request.params.id);
        // console.log("Modelo: ",request);
      return model;

    }
    async busquedaDelito(request: Request, response: Response, next: NextFunction) {
      var query =request.b-ody;
      console.log(query);
      return this.delitoRepository.find(query);

    }
    async editarDelito(request: Request, response: Response, next: NextFunction) {
      return await getConnection()
          .createQueryBuilder()
          .update(Delito)
          .set(request.body)
          .where("id = :id", { id: request.params.id })
          .execute();
        // const model =await this.personaRepository.update(request.body);
        // console.log("Modelo: ",request.body);
      // return model;

    }

    async eliminaDelito(request: Request, response: Response, next: NextFunction) {
        var id = request.params.id;
        return await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Delito)
        .where("id = :id", {id:id})
        .execute();
    }
    async menorId(request: Request, response: Response, next: NextFunction) {
        return this.delitoRepository.find({id: LessThan(4)});
    }
    async tipoDelito(request: Request, response: Response, next: NextFunction) {
      return this.delitoRepository.find({tipo_delito: Like("%H%")});
    }

}
