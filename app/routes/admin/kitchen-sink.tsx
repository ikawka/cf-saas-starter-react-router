"use client";

import * as React from "react";
import {
  AlertCircle,
  Bell,
  Bold,
  Calendar as CalendarIcon,
  Check,
  ChevronRight,
  ChevronsUpDown,
  CircleUser,
  Copy,
  CreditCard,
  FileText,
  Home,
  Inbox,
  Info,
  Italic,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Terminal,
  Trash,
  Underline,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { FileUpload } from "@/components/file-upload";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { NativeSelect } from "@/components/ui/native-select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/client";

import { SiteHeader } from "./layout/site-header";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ComponentCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function KitchenSink() {
  const createWorkflowMutation = api.user.createWorkflow.useMutation();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [progress, setProgress] = React.useState(33);
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <SiteHeader title="Kitchen Sink" />
      <div className="space-y-12 p-6">
        {/* ============================================ */}
        {/* LAYOUT & STRUCTURE */}
        {/* ============================================ */}
        <Section title="Layout & Structure">
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard title="Accordion">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentCard>

            <ComponentCard title="Collapsible">
              <Collapsible
                open={isCollapsibleOpen}
                onOpenChange={setIsCollapsibleOpen}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between space-x-4">
                  <h4 className="text-sm font-semibold">
                    @peduarte starred 3 repositories
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                  @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                    @radix-ui/colors
                  </div>
                  <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                    @stitches/react
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </ComponentCard>

            <ComponentCard title="Aspect Ratio">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  16:9 Aspect Ratio
                </div>
              </AspectRatio>
            </ComponentCard>

            <ComponentCard title="Separator">
              <div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">
                    Radix Primitives
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    An open-source UI component library.
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <div>Blog</div>
                  <Separator orientation="vertical" />
                  <div>Docs</div>
                  <Separator orientation="vertical" />
                  <div>Source</div>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Resizable Panels">
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[150px] max-w-md rounded-lg border"
              >
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="font-semibold">Panel A</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="font-semibold">Panel B</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ComponentCard>

            <ComponentCard title="Scroll Area">
              <ScrollArea className="h-[150px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="text-sm">
                      Item {i + 1} - Scrollable content area with custom
                      scrollbar styling.
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </ComponentCard>

            <ComponentCard title="Card">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>
            </ComponentCard>

            <ComponentCard title="Empty State">
              <Empty className="border">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Inbox />
                  </EmptyMedia>
                  <EmptyTitle>No items found</EmptyTitle>
                  <EmptyDescription>
                    Get started by creating a new item.
                  </EmptyDescription>
                </EmptyHeader>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </Empty>
            </ComponentCard>
          </div>
        </Section>

        {/* ============================================ */}
        {/* NAVIGATION */}
        {/* ============================================ */}
        <Section title="Navigation">
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard title="Breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </ComponentCard>

            <ComponentCard title="Menubar">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>Redo</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </ComponentCard>

            <ComponentCard title="Navigation Menu">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">
                                Introduction
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Re-usable components built with Radix UI.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">
                                Installation
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                How to install dependencies and structure your
                                app.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </ComponentCard>

            <ComponentCard title="Pagination">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </ComponentCard>

            <ComponentCard title="Tabs">
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Make changes to your account here.
                  </p>
                </TabsContent>
                <TabsContent value="password" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Change your password here.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Update your settings here.
                  </p>
                </TabsContent>
              </Tabs>
            </ComponentCard>
          </div>
        </Section>

        {/* ============================================ */}
        {/* FORMS & INPUTS */}
        {/* ============================================ */}
        <Section title="Forms & Inputs">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Button Variants">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Button Sizes">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon">
                  <Plus />
                </Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Button States">
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Loading
                </Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Button Group">
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Middle</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>
            </ComponentCard>

            <ComponentCard title="Input">
              <div className="space-y-2">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input disabled placeholder="Disabled" />
              </div>
            </ComponentCard>

            <ComponentCard title="Input Group">
              <div className="space-y-2">
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Mail className="h-4 w-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Email" />
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="example.com" />
                </InputGroup>
              </div>
            </ComponentCard>

            <ComponentCard title="Input OTP">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </ComponentCard>

            <ComponentCard title="Textarea">
              <Textarea placeholder="Type your message here." />
            </ComponentCard>

            <ComponentCard title="Select">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </ComponentCard>

            <ComponentCard title="Native Select">
              <NativeSelect>
                <option value="">Select an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </NativeSelect>
            </ComponentCard>

            <ComponentCard title="Checkbox">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" defaultChecked />
                  <Label htmlFor="marketing">Receive marketing emails</Label>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Radio Group">
              <RadioGroup defaultValue="option-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-2" id="option-2" />
                  <Label htmlFor="option-2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-3" id="option-3" />
                  <Label htmlFor="option-3">Option 3</Label>
                </div>
              </RadioGroup>
            </ComponentCard>

            <ComponentCard title="Switch">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" defaultChecked />
                  <Label htmlFor="notifications">Notifications</Label>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Slider">
              <div className="space-y-4">
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                />
                <p className="text-sm text-muted-foreground">
                  Value: {sliderValue}
                </p>
              </div>
            </ComponentCard>

            <ComponentCard title="Toggle">
              <div className="flex gap-2">
                <Toggle aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle bold" defaultPressed>
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle underline">
                  <Underline className="h-4 w-4" />
                </Toggle>
              </div>
            </ComponentCard>

            <ComponentCard title="Toggle Group">
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </ComponentCard>

            <ComponentCard title="Label">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email-2">Email</Label>
                <Input type="email" id="email-2" placeholder="Email" />
              </div>
            </ComponentCard>
          </div>
        </Section>

        {/* ============================================ */}
        {/* FEEDBACK */}
        {/* ============================================ */}
        <Section title="Feedback">
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard title="Alert">
              <div className="space-y-4">
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app using the cli.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your session has expired. Please log in again.
                  </AlertDescription>
                </Alert>
              </div>
            </ComponentCard>

            <ComponentCard title="Progress">
              <div className="space-y-4">
                <Progress value={progress} className="w-full" />
                <Progress value={100} className="w-full" />
                <Progress value={25} className="w-full" />
              </div>
            </ComponentCard>

            <ComponentCard title="Skeleton">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Spinner">
              <div className="flex items-center gap-4">
                <Spinner />
                <Spinner className="h-8 w-8" />
                <Spinner className="h-12 w-12" />
              </div>
            </ComponentCard>

            <ComponentCard title="Toast (Sonner)">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => toast("Event has been created")}
                >
                  Default Toast
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success("Success!", {
                      description: "Your changes have been saved.",
                    })
                  }
                >
                  Success
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.error("Error!", {
                      description: "Something went wrong.",
                    })
                  }
                >
                  Error
                </Button>
              </div>
            </ComponentCard>
          </div>
        </Section>

        {/* ============================================ */}
        {/* OVERLAYS & DIALOGS */}
        {/* ============================================ */}
        <Section title="Overlays & Dialogs">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ComponentCard title="Alert Dialog">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ComponentCard>

            <ComponentCard title="Dialog">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ComponentCard>

            <ComponentCard title="Drawer">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you sure?</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </ComponentCard>

            <ComponentCard title="Sheet">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <Input placeholder="Name" />
                  </div>
                  <SheetFooter>
                    <Button>Save changes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </ComponentCard>

            <ComponentCard title="Popover">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          defaultValue="100%"
                          className="col-span-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </ComponentCard>

            <ComponentCard title="Tooltip">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ComponentCard>

            <ComponentCard title="Hover Card">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@nextjs</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </ComponentCard>

            <ComponentCard title="Context Menu">
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[100px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuCheckboxItem checked>
                    Show Bookmarks Bar
                  </ContextMenuCheckboxItem>
                  <ContextMenuSeparator />
                  <ContextMenuRadioGroup value="pedro">
                    <ContextMenuLabel>People</ContextMenuLabel>
                    <ContextMenuRadioItem value="pedro">
                      Pedro Duarte
                    </ContextMenuRadioItem>
                    <ContextMenuRadioItem value="colm">
                      Colm Tuite
                    </ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuContent>
              </ContextMenu>
            </ComponentCard>

            <ComponentCard title="Dropdown Menu">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Open Menu
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentCard>

            <ComponentCard title="Command">
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Calendar
                    </CommandItem>
                    <CommandItem>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </CommandItem>
                    <CommandItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </ComponentCard>
          </div>
        </Section>

        {/* ============================================ */}
        {/* DATA DISPLAY */}
        {/* ============================================ */}
        <Section title="Data Display">
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard title="Avatar">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/vercel.png"
                    alt="@vercel"
                  />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
              </div>
            </ComponentCard>

            <ComponentCard title="Badge">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </ComponentCard>

            <ComponentCard title="Calendar">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </ComponentCard>

            <ComponentCard title="Carousel">
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </ComponentCard>

            <ComponentCard title="Table">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ComponentCard>

            <ComponentCard title="Kbd (Keyboard)">
              <div className="flex flex-wrap items-center gap-4">
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
                <Kbd>Enter</Kbd>
                <Kbd>Shift</Kbd>
              </div>
            </ComponentCard>

            <ComponentCard title="Item">
              <ItemGroup className="rounded-lg border">
                <Item>
                  <ItemMedia variant="icon">
                    <FileText className="h-4 w-4" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Document.pdf</ItemTitle>
                    <ItemDescription>2.4 MB - Uploaded yesterday</ItemDescription>
                  </ItemContent>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </Item>
                <ItemSeparator />
                <Item>
                  <ItemMedia variant="icon">
                    <FileText className="h-4 w-4" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Spreadsheet.xlsx</ItemTitle>
                    <ItemDescription>1.2 MB - Uploaded last week</ItemDescription>
                  </ItemContent>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </Item>
              </ItemGroup>
            </ComponentCard>
          </div>
        </Section>

        {/* ============================================ */}
        {/* CUSTOM / MISC */}
        {/* ============================================ */}
        <Section title="Custom Components">
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard title="Workflow Trigger">
              <div className="space-y-4">
                <Button
                  onClick={() => {
                    createWorkflowMutation.mutate({
                      email: "test@example.com",
                      metadata: {
                        test: "test",
                      },
                    });
                  }}
                >
                  Trigger Workflow
                </Button>
                {createWorkflowMutation.isPending && (
                  <p className="text-sm text-muted-foreground">
                    Creating workflow...
                  </p>
                )}
                {createWorkflowMutation.isSuccess && (
                  <p className="text-sm text-green-600">
                    Workflow created successfully
                  </p>
                )}
                {createWorkflowMutation.isError && (
                  <p className="text-sm text-destructive">
                    Error creating workflow
                  </p>
                )}
              </div>
            </ComponentCard>

            <ComponentCard title="File Upload">
              <FileUpload
                onUploadSuccess={(key) => {
                  console.log(key);
                  toast.success("File uploaded!", {
                    description: `File key: ${key}`,
                  });
                }}
              />
            </ComponentCard>
          </div>
        </Section>
      </div>
    </div>
  );
}
