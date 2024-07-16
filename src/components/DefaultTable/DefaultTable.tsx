import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { userApi } from "@/services";
import { useState, useEffect, useCallback } from "react";
import { IUser } from "@/types";
import { Input } from "@/components/ui/input";
import { ExportToExcel, UpdateUser } from "@/components";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import _ from "lodash";
import { useQuery } from "react-query";

const FormSchema = z.object({
  role: z.string({
    required_error: "Please select a role to display.",
  }),
});

const TABLE_HEAD = [
  { name: "Email", isSorted: false, type: "email" },
  { name: "Phone Number", isSorted: false, type: "phone" },
  { name: "Firstname", isSorted: true, type: "firstName" },
  { name: "Lastname", isSorted: true, type: "lastName" },
  { name: "Role", isSorted: true, type: "role" },
  { name: "", isSorted: false, type: "" },
];

export default function DefaultTable() {
  const [sortedData, setSortedData] = useState<IUser[]>();
  const [order, setOrder] = useState("ASC");
  const [filteredResults, setFilteredResults] = useState<
    IUser[] | null | undefined
  >(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [role, setRole] = useState("");
  const [paginatedData, setPaginatedData] = useState<IUser[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Rows per page
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>(); // User to edit

  const getUsers = async () => {
    const res = await userApi.getUsers();
    if (res) {
      console.log(res);
    }
    return res;
  };

  let { data: userdata, status } = useQuery("users", getUsers);

  useEffect(() => {
    getPaginatedPage();
    console.log(paginatedData);
  }, [userdata, sortedData, filteredResults, pageSize]);

  useEffect(() => {}, [paginatedData]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const pageCount = userdata ? Math.ceil(userdata.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo: number) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    if (sortedData) {
      setPaginatedData(_(sortedData).slice(startIndex).take(pageSize).value());
    } else {
      if (filteredResults) {
        setPaginatedData(
          _(filteredResults).slice(startIndex).take(pageSize).value()
        );
      } else {
        setPaginatedData(_(userdata).slice(startIndex).take(pageSize).value());
      }
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //   console.log("role submit",data)
    setRole(form.getValues("role"));

    let filteredUsers;
    if (searchInput !== "") {
      filteredUsers = filteredResults?.filter((user) => {
        return role === "" || user.role === data.role;
      });
    } else {
      filteredUsers = userdata?.filter((user) => {
        return data.role === "" || user.role === data.role;
      });
    }

    if (filteredUsers) {
      setFilteredResults(filteredUsers);
    } else {
      setFilteredResults(null);
    }
  }

  async function getPaginatedPage() {
    if (sortedData) {
      setPaginatedData(_(sortedData).slice(0).take(pageSize).value());
    } else {
      if (filteredResults === undefined) {
        setPaginatedData(_(userdata).slice(0).take(pageSize).value());
      } else {
        setPaginatedData(_(filteredResults).slice(0).take(pageSize).value());
      }
    }
  }
  // Xu ly sort by filed
  const sorting = (col: string) => {
    if (userdata) {
      if (order === "ASC") {
        const sorted = [...userdata].sort((a, b) =>
          a[col as keyof IUser].toLowerCase() >
          b[col as keyof IUser].toLowerCase()
            ? 1
            : -1
        );

        setSortedData(sorted);
        setOrder("DSC");
      }
      if (order === "DSC") {
        const sorted = [...userdata].sort((a, b) =>
          a[col as keyof IUser].toLowerCase() <
          b[col as keyof IUser].toLowerCase()
            ? 1
            : -1
        );

        setSortedData(sorted);
        setOrder("ASC");
      }
    }
  };

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = userdata?.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      if (filteredData) {
        setFilteredResults(filteredData);
      }
    } else {
      if (userdata) {
        setFilteredResults(userdata);
      }
    }
  };

  const handleEditUser = (user: IUser) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const renderDataTable = (userdata: IUser[]) => {
    return (
      <>
        {userdata.map((user, index) => {

          const classes = "p-4 border-b border-blue-gray-50";

          return (
            <tr key={user.email}>
              <td className={classes}>
                <h2 className="font-normal">{user.email}</h2>
              </td>
              <td className={classes}>
                <h2 className="font-normal">{user.phoneNumber}</h2>
              </td>
              <td className="p-4 border-b border-blue-gray-50 text-center">
                <h2 className="font-normal">{user.firstName}</h2>
              </td>
              <td className="p-4 border-b border-blue-gray-50 text-center">
                <h2 className="font-normal">{user.lastName}</h2>
              </td>
              <td className="p-4 border-b border-blue-gray-50 text-center">
                <h2 className="font-normal">{user.role}</h2>
              </td>
              <td className={classes}>
                <h2
                  className="font-medium cursor-pointer"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </h2>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <div className="h-full w-full">
      {currentUser ? (
        <UpdateUser data={currentUser} isOpen={open} setOpen={setOpen} />
      ) : null}
      
      <div className="flex gap-3 mb-3">
        <Input
          className="md:text-base sm:text-sm text-xs md:w-auto w-60"
          placeholder="Search User..."
          onChange={(e) => searchItems(e.target.value)}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="md:text-base sm:text-sm text-xs" type="submit">Search</Button>
            </div>
          </form>
        </Form>
        {userdata ? (
          <ExportToExcel apiData={userdata} fileName="exportingdataUser" />
        ) : null}
      </div>
      <table className="md:w-full table-auto text-left sm:w-[640px] w-[356px] md:text-base sm:text-sm text-xs">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head.name}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                {head.isSorted ? (
                  <Button variant="ghost" onClick={() => sorting(head.type)}>
                    <h2 className="font-normal leading-none opacity-70 ">
                      {head.name}
                    </h2>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <h2 className="font-normal leading-none opacity-70 ">
                    {head.name}
                  </h2>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>

          {paginatedData ? renderDataTable(paginatedData) : null}
        </tbody>
      </table>
      <nav className="flex justify-center gap-2 items-center mt-6 ">
        <Label className="text-center md:text-base sm:text-sm text-xs">Rows per page</Label>
        <Select
          defaultValue="5"
          onValueChange={(val) => setPageSize(parseInt(val))}
        >
          <SelectTrigger className="md:w-[80px] sm:w-[70px] w-[50px] md:text-base sm:text-sm text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ul className="flex items-center space-x-2 ">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage
                  ? "md:w-10 md:h-10 w-8 h-8 text-center py-2 rounded border border-gray-300 bg-blue-500 text-white cursor-pointer md:text-base sm:text-sm text-xs"
                  : "md:w-10 md:h-10 w-8 h-8 text-center py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 cursor-pointer md:text-base sm:text-sm text-xs"
              }
            >
              <p onClick={() => pagination(page)}>{page}</p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
