import { IUser } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "firstName",
    header: "Firstname",
  },
  {
    accessorKey:"lastName",
    header: "Lastname",
  },
  {
    accessorKey: "role",
    header: "Role",
  }
]
