import { v4 as uuidV4 } from "uuid";
import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("users_token")
class UserToken {
  constructor() {
    this.id = uuidV4();
  }

  @PrimaryColumn({ type: "uuid" })
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ name: "status", type: "varchar" })
  status: "inactive" | "active";
}

export { UserToken };
