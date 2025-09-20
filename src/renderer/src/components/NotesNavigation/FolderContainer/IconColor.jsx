// index.js

import {
    // Folder Icons (General)
    Folder,
    FolderOpen,
    FolderPlus,
    FolderArchive,
    FolderCheck,
    FolderClosed,
    FolderCode,
    FolderCog,
    FolderDot,
    FolderHeart,
    FolderLock,
    FolderMinus,
    FolderOpenDot,
    FolderOutput,
    FolderPen,
    FolderRoot,
    FolderSearch,
    FolderSymlink,
    FolderSync,
    FolderTree,
    FolderUp,
    FolderX,
    Folders,

    // Research & Study
    Book,
    Library,
    GraduationCap,
    School,
    FlaskConical,
    ClipboardList,

    // Games
    Gamepad,
    Sword,
    Bomb,
    Trophy,

    // Movies & Entertainment
    Clapperboard,
    Film,
    Video,
    MonitorPlay,
    Ticket,
    Music,

    // Office & Business
    Briefcase,
    Calendar,
    Contact,
    File,
    FileText,
    CreditCard,
    DollarSign,
    Clipboard,
    Mail,

    // Social & Communication
    User,
    Users,
    MessageSquare,
    Phone,
    AtSign,
    Link,
    Share2,

    // Creative & Design
    PenTool,
    Palette,
    Camera,
    Layers,
    Feather,
    Layout,
    Type,

    // Technology & Devices
    Laptop,
    Monitor,
    Smartphone,
    Server,
    Database,
    Cloud,
    HardDrive,
    Keyboard,

    // Home & Lifestyle
    Home,
    Heart,
    Utensils,
    Plane,
    ShoppingCart,
    MapPin,
    Coffee,
    Sun,
    Moon,

    // Health & Medical
    HeartPulse,
    Syringe,
    Pill,
    Stethoscope,

    // Tools & Settings
    Settings,
    Wrench,
    Plus,
    Minus,
    Check,
    X,
    Trash2,
    Lock,
    Unlock,
    AlertTriangle
} from "lucide-react"

const CustomIcon = ({
    size = 24,
    color = "currentColor",
    viewBox = "0 0 24 24",
    path,
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}px`}
        height={`${size}px`}
        fill={color}
        viewBox={viewBox}
        {...props}
    >
        <path d={path} />
    </svg>
)

const makeIcon = (path) => (props) => <CustomIcon path={path} {...props} />

const folderIcon = makeIcon(
    "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"
)

const DashboardIcon = makeIcon(
    "M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"
)

export const iconOptions = [
    // --- Folder Icons ---
    { id: "default", icon: folderIcon, name: "Default" },
    { id: "dashboard", icon: DashboardIcon, name: "Dashboard" },
    { id: "open", icon: FolderOpen, name: "Open" },
    { id: "plus", icon: FolderPlus, name: "New" },
    { id: "archive", icon: FolderArchive, name: "Archive" },
    { id: "check", icon: FolderCheck, name: "Verified" },
    { id: "closed", icon: FolderClosed, name: "Closed" },
    { id: "code", icon: FolderCode, name: "Code" },
    { id: "cog", icon: FolderCog, name: "Settings" },
    { id: "dot", icon: FolderDot, name: "Dot" },
    { id: "heart-folder", icon: FolderHeart, name: "Favorite Folder" },
    { id: "lock", icon: FolderLock, name: "Locked" },
    { id: "minus", icon: FolderMinus, name: "Remove" },
    { id: "open-dot", icon: FolderOpenDot, name: "Open with Dot" },
    { id: "output", icon: FolderOutput, name: "Output" },
    { id: "pen", icon: FolderPen, name: "Edit" },
    { id: "root", icon: FolderRoot, name: "Root" },
    { id: "search", icon: FolderSearch, name: "Search" },
    { id: "symlink", icon: FolderSymlink, name: "Symlink" },
    { id: "sync", icon: FolderSync, name: "Sync" },
    { id: "tree", icon: FolderTree, name: "Tree View" },
    { id: "up", icon: FolderUp, name: "Up" },
    { id: "x", icon: FolderX, name: "Error" },
    { id: "multiple-folders", icon: Folders, name: "Multiple Folders" },

    // --- Research & Study Icons ---
    { id: "book", icon: Book, name: "Books" },
    { id: "library", icon: Library, name: "Library" },
    { id: "graduation-cap", icon: GraduationCap, name: "Education" },
    { id: "school", icon: School, name: "School" },
    { id: "flask", icon: FlaskConical, name: "Science" },
    { id: "clipboard-list", icon: ClipboardList, name: "Assignments" },

    // --- Games Icons ---
    { id: "gamepad", icon: Gamepad, name: "Games" },
    { id: "sword", icon: Sword, name: "Fantasy" },
    { id: "bomb", icon: Bomb, name: "Action" },
    { id: "trophy", icon: Trophy, name: "Achievements" },

    // --- Movies & Entertainment Icons ---
    { id: "clapperboard", icon: Clapperboard, name: "Movies" },
    { id: "film", icon: Film, name: "Film" },
    { id: "video", icon: Video, name: "Video" },
    { id: "monitor-play", icon: MonitorPlay, name: "TV Shows" },
    { id: "ticket", icon: Ticket, name: "Tickets" },
    { id: "music", icon: Music, name: "Music" },

    // --- Office & Business Icons ---
    { id: "work", icon: Briefcase, name: "Work" },
    { id: "calendar", icon: Calendar, name: "Calendar" },
    { id: "contacts", icon: Contact, name: "Contacts" },
    { id: "documents", icon: File, name: "Documents" },
    { id: "text-files", icon: FileText, name: "Text Files" },
    { id: "finance", icon: CreditCard, name: "Finance" },
    { id: "dollar", icon: DollarSign, name: "Payments" },
    { id: "notes", icon: Clipboard, name: "Notes" },
    { id: "email", icon: Mail, name: "Email" },

    // --- Social & Communication Icons ---
    { id: "user", icon: User, name: "Profile" },
    { id: "users", icon: Users, name: "Team" },
    { id: "messages", icon: MessageSquare, name: "Messages" },
    { id: "phone", icon: Phone, name: "Calls" },
    { id: "at-sign", icon: AtSign, name: "Mentions" },
    { id: "links", icon: Link, name: "Links" },
    { id: "share", icon: Share2, name: "Share" },

    // --- Creative & Design Icons ---
    { id: "design", icon: PenTool, name: "Design" },
    { id: "palette", icon: Palette, name: "Colors" },
    { id: "camera", icon: Camera, name: "Photos" },
    { id: "layers", icon: Layers, name: "Layers" },
    { id: "writing", icon: Feather, name: "Writing" },
    { id: "layout", icon: Layout, name: "Layouts" },
    { id: "typography", icon: Type, name: "Fonts" },

    // --- Technology & Devices Icons ---
    { id: "laptop", icon: Laptop, name: "Laptop" },
    { id: "monitor", icon: Monitor, name: "Monitor" },
    { id: "smartphone", icon: Smartphone, name: "Mobile" },
    { id: "server", icon: Server, name: "Server" },
    { id: "database", icon: Database, name: "Database" },
    { id: "cloud", icon: Cloud, name: "Cloud" },
    { id: "hard-drive", icon: HardDrive, name: "Storage" },
    { id: "keyboard", icon: Keyboard, name: "Keyboard" },

    // --- Home & Lifestyle Icons ---
    { id: "home", icon: Home, name: "Home" },
    { id: "favorites", icon: Heart, name: "Favorites" },
    { id: "recipes", icon: Utensils, name: "Recipes" },
    { id: "travel", icon: Plane, name: "Travel" },
    { id: "shopping", icon: ShoppingCart, name: "Shopping" },
    { id: "location", icon: MapPin, name: "Location" },
    { id: "coffee", icon: Coffee, name: "Coffee" },
    { id: "day-mode", icon: Sun, name: "Day" },
    { id: "night-mode", icon: Moon, name: "Night" },

    // --- Health & Medical Icons ---
    { id: "health", icon: HeartPulse, name: "Health" },
    { id: "syringe", icon: Syringe, name: "Medical" },
    { id: "pills", icon: Pill, name: "Medication" },
    { id: "stethoscope", icon: Stethoscope, name: "Doctor" },

    // --- Tools & Settings Icons ---
    { id: "settings", icon: Settings, name: "Settings" },
    { id: "tools", icon: Wrench, name: "Tools" },
    { id: "add", icon: Plus, name: "Add" },
    { id: "remove", icon: Minus, name: "Remove" },
    { id: "success", icon: Check, name: "Success" },
    { id: "error", icon: X, name: "Error" },
    { id: "delete", icon: Trash2, name: "Delete" },
    { id: "locked", icon: Lock, name: "Locked" },
    { id: "unlocked", icon: Unlock, name: "Unlocked" },
    { id: "warning", icon: AlertTriangle, name: "Warning" }
]

export const material3Colors = [
    "#5E5E5E", // default
    "#0075E4",
    "#DA2655",
    "#FFA74E",
    "#007F57",
    "#C519B1",
    "#7E54FF",
    "#14798F",
    "#F0693F"
]
