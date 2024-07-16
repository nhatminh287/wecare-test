import { IUser, IAddUserdata } from "@/types";
import { useToast } from "@/components/ui/use-toast"
import { DefaultTable, } from "@/components";
// import { ImageUpload } from "@/components/ImageUpload";
import { useState, useEffect } from "react";
import { userApi } from "@/services";
import { firebaseStorage } from '@/config';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImagePlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
type ImageUploadType = File | null;

const formSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }) // Makes sure the email field isn't empty
    .email({ message: "Email is invalid" }),
    phoneNumber: z.string(),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    role: z.string().min(4, {
      message: "Please select a role",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Password didn't match.",
  });

const UserInfo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [open, setOpen] = useState(false)
  //Xử lý đẩy ảnh lên firebase
  const [imageUpload, setImageUpload] = useState<ImageUploadType>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast()
  useEffect(() => {
    setImageUrl(imageUpload ? URL.createObjectURL(imageUpload) : null);
  }, [imageUpload]);

    //Xử lý đẩy ảnh lên firebase
    const uploadFile = async () => {
      if (imageUpload == null) return '';
      const imageRef = ref(firebaseStorage, `user-logo/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload)
  
      const url = await getDownloadURL(snapshot.ref);
      // setValue('logo', url);
      return url;
    };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log('data', values)
    const logoUrl = await uploadFile();
    const updateInfo: IAddUserdata = {
      email: values.email,
      phoneNumber: values.phoneNumber,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      password: values.password,
      image: logoUrl
    }
    toast({
      title: "Loading...",
      description: "A few seconds to be completed!",
    })
    const res = await userApi.addUser(updateInfo)
      if (res) {
        toast({
          title: "Successful",
          description: "Your item was added!",
        })
      }
  }
  return (
    <div className="md:text-base sm:text-sm text-xs">
      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add new user</DialogTitle>
          </DialogHeader>
          <div className="flex gap-10">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email.." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="basis-1/2">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
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
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firstname</FormLabel>
                          <FormControl>
                            <Input placeholder="First name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            value={field.value}
                            onChange={field.onChange}
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="confirmPassword"
                            value={field.value}
                            onChange={field.onChange}
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
            <div className="basis-1/3">
              <div className="text-center mb-2"><Label >Add user image</Label></div>
              <label htmlFor="upload-image" className="relative group">
                {imageUrl ? (
                  <img
                    className="cursor-pointer group-hover:opacity-90 rounded-md w-40 h-40 mx-auto mt-5"
                    src={imageUrl}
                  />
                ) : (
                  <ImagePlus className="mx-auto mt-5" size={120}/>
                )}
                <div className="absolute opacity-90 cursor-pointer top-[50%] left-[19%] text-white bg-gray-500 px-2 py-1.5 rounded-md mx-auto hidden group-hover:block">
                  Add image
                </div>
              </label>
              <input
                type="file"
                id="upload-image"
                className="hidden"
                onChange={(e) => setImageUpload(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-3">
          <Button className="md:text-base sm:text-sm text-xs" onClick={() => setOpen(true)}>Add new user</Button>
          </div>
        <DefaultTable />
      </div>                
    </div>
  );
};

export default UserInfo;
