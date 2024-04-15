import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("refresh_tokens")
class RefreshToken {
  constructor() {
    this.id = randomUUID();
  }

  @PrimaryColumn({ type: "uuid" })
  id: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ name: "issued_at", type: "date" })
  issuedAt: Date;

  @Column({ name: "expiration_time", type: "date" })
  expirationTime: Date;

  @Column({ type: "varchar" })
  token: string;
}

export { RefreshToken };
