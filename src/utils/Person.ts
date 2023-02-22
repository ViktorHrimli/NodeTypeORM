import { Entity, Column } from "typeorm";

import { Base } from "../utils/BaseClass";

@Entity()
export class Person extends Base {
  @Column()
  first_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "simple-json", nullable: true, default: null })
  client_info: {
    age: number;
    color_hair: string;
  };

  @Column({ type: "simple-array" })
  family_members: string[];
}
