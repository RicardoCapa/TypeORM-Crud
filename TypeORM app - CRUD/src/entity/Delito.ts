import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Persona} from "./Persona";

@Entity()
export class Delito {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo_delito: string;

    @Column()
    descripcion: string;

    @Column()
    circuito: string;

    @Column()
    canton: string;

    @Column()
    barrio: string;

    @ManyToMany(type => Persona)
    @JoinTable()
    persona: Persona[];
}
