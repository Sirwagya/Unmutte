import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  User,
  Mail,
  Lock,
  LogOut,
  Settings,
  Heart,
  Clock,
  Shield,
  Eye,
  EyeOff,
  Coins,
  Gift,
  Trophy,
  Star,
  Sparkles,
  Check,
  Edit2,
  X as XIcon,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";

interface AccountPageProps {
  isLoggedIn: boolean;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

const avatarCategories = {
  people: [
    // People - Various skin tones and genders
    "👤", "👥", "🧑", "👨", "👩", "🧔", "🧔‍♀️", "🧔‍♂️",
    "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", "👩‍🦰", "👩‍🦱", "👩‍🦳", "👩‍🦲",
    "👶", "🧒", "👦", "👧", "🧑‍🦰", "🧑‍🦱", "🧑‍🦳", "🧑‍🦲",
    "👴", "👵", "🧓", "👨‍⚕️", "👩‍⚕️", "👨‍🎓", "👩‍🎓", "👨‍🏫",
    "👩‍🏫", "👨‍⚖️", "👩‍⚖️", "👨‍🌾", "👩‍🌾", "👨‍🍳", "👩‍🍳", "👨‍🔧",
    "👩‍🔧", "👨‍🏭", "👩‍🏭", "👨‍💼", "👩‍💼", "👨‍🔬", "👩‍🔬", "👨‍💻",
    "👩‍💻", "👨‍🎤", "👩‍🎤", "👨‍🎨", "👩‍🎨", "👨‍✈️", "👩‍✈️", "👨‍🚀",
    "👩‍🚀", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️",
    "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "🥷", "👷", "👷‍♂️", "👷‍♀️",
    "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🤵",
    "🤵‍♂️", "🤵‍♀️", "👰", "👰‍♂️", "👰‍♀️", "🤰", "🤱", "👼",
  ],
  smileys: [
    "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂",
    "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩",
    "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜",
    "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐",
    "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬",
    "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷",
    "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴",
    "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓",
    "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲",
    "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢",
    "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫",
    "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀",
    "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾",
    "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀",
    "😿", "😾",
  ],
  gestures: [
    "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏",
    "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆",
    "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛",
    "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️",
    "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂",
    "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀",
    "👁️", "👅", "👄", "💋", "🩸",
  ],
  animals: [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
    "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵",
    "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤",
    "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗",
    "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞",
    "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🕸️",
    "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑",
    "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳",
    "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧",
    "🦣", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘",
    "🦬", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑",
    "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈",
    "🐈‍⬛", "🪶", "🐓", "🦃", "🦤", "🦚", "🦜", "🦢",
    "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡", "🦫", "🦦",
    "🦥", "🐁", "🐀", "🐿️", "🦔",
  ],
  nature: [
    "🌸", "🌺", "🌻", "🌷", "🌹", "🥀", "🏵️", "💐",
    "🌼", "🌱", "🌿", "🍀", "🍁", "🍂", "🍃", "🌾",
    "🌲", "🌳", "🌴", "🌵", "🌾", "🎋", "🎍", "🪴",
    "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔",
    "🌙", "🌎", "🌍", "🌏", "💫", "⭐", "🌟", "✨",
    "⚡", "☄️", "💥", "🔥", "🌈", "☀️", "🌤️", "⛅",
    "🌥️", "☁️", "🌦️", "🌧️", "⛈️", "🌩️", "🌨️", "❄️",
    "☃️", "⛄", "🌬️", "💨", "💧", "💦", "☔", "🌊",
  ],
  food: [
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
    "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥",
    "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️",
    "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠",
    "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳",
    "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴",
    "🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆",
    "🌮", "🌯", "🫔", "🥗", "🥘", "🫕", "🥫", "🍝",
    "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤",
    "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡",
    "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮",
    "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🌰", "🥜",
    "🍯", "🥛", "🍼", "🫖", "☕", "🍵", "🧃", "🥤",
    "🧋", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸",
    "🍹", "🧉", "🍾", "🧊",
  ],
  activities: [
    "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉",
    "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍",
    "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿",
    "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌",
    "🎿", "⛷️", "🏂", "🪂", "🏋️", "🏋️‍♂️", "🏋️‍♀️", "🤼",
    "🤼‍♂️", "🤼‍♀️", "🤸", "🤸‍♂️", "🤸‍♀️", "⛹️", "⛹️‍♂️", "⛹️‍♀️",
    "🤺", "🤾", "🤾‍♂️", "🤾‍♀️", "🏌️", "🏌️‍♂️", "🏌️‍♀️", "🏇",
    "🧘", "🧘‍♂️", "🧘‍♀️", "🏄", "🏄‍♂️", "🏄‍♀️", "🏊", "🏊‍♂️",
    "🏊‍♀️", "🤽", "🤽‍♂️", "🤽‍♀️", "🚣", "🚣‍♂️", "🚣‍♀️", "🧗",
    "🧗‍♂️", "🧗‍♀️", "🚵", "🚵‍♂️", "🚵‍♀️", "🚴", "🚴‍♂️", "🚴‍♀️",
    "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🪘",
    "🎷", "🎺", "🪗", "🎸", "🪕", "🎻", "🎲", "♟️",
    "🎯", "🎳", "🎮", "🎰", "🧩",
  ],
  travel: [
    "🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑",
    "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🦯", "🦽",
    "🦼", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚨", "🚔",
    "🚍", "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋",
    "🚞", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇",
    "🚊", "🚉", "✈️", "🛫", "🛬", "🛩️", "💺", "🛰️",
    "🚀", "🛸", "🚁", "🛶", "⛵", "🚤", "🛥️", "🛳️",
    "⛴️", "🚢", "⚓", "🪝", "⛽", "🚧", "🚦", "🚥",
    "🗺️", "🗿", "🗽", "🗼", "🏰", "🏯", "🏟️", "🎡",
    "🎢", "🎠", "⛲", "⛱️", "🏖️", "🏝️", "🏜️", "🌋",
    "⛰️", "🏔️", "🗻", "🏕️", "⛺", "🛖", "🏠", "🏡",
    "🏘️", "🏚️", "🏗️", "🏭", "🏢", "🏬", "🏣", "🏤",
    "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛️",
    "⛪", "🕌", "🕍", "🛕", "🕋", "⛩️", "🛤️", "🛣️",
  ],
  objects: [
    "⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️",
    "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼",
    "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️",
    "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭",
    "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋",
    "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸",
    "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎",
    "⚖️", "🪜", "🧰", "🪛", "🔧", "🔨", "⚒️", "🛠️",
    "⛏️", "🪚", "🔩", "⚙️", "🪤", "🧱", "⛓️", "🧲",
    "🔫", "💣", "🧨", "🪓", "🔪", "🗡️", "⚔️", "🛡️",
    "🚬", "⚰️", "🪦", "⚱️", "🏺", "🔮", "📿", "🧿",
    "💈", "⚗️", "🔭", "🔬", "🕳️", "🩹", "🩺", "💊",
    "💉", "🩸", "🧬", "🦠", "🧫", "🧪", "🌡️", "🧹",
    "🪠", "🧺", "🧻", "🚽", "🚰", "🚿", "🛁", "🛀",
    "🧼", "🪥", "🪒", "🧽", "🪣", "🧴", "🛎️", "🔑",
    "🗝️", "🚪", "🪑", "🛋️", "🛏️", "🛌", "🧸", "🪆",
    "🖼️", "🪞", "🪟", "🛍️", "🛒", "🎁", "🎈", "🎏",
    "🎀", "🪄", "🪅", "🎊", "🎉", "🎎", "🏮", "🎐",
  ],
  symbols: [
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍",
    "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖",
    "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️",
    "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈",
    "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐",
    "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️",
    "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️",
    "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹",
    "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌",
    "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️",
    "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗",
    "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️",
    "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯",
    "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀",
    "💤", "🏧", "🚾", "♿", "🅿️", "🛗", "🈳", "🈂️",
    "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "⚧️",
    "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤",
    "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓",
    "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣",
    "8️⃣", "9️⃣", "🔟", "🔢", "#️⃣", "*️⃣", "⏏️", "▶️",
    "⏸️", "⏯️", "⏹️", "⏺️", "⏭️", "⏮️", "⏩", "⏪",
    "⏫", "⏬", "◀️", "🔼", "🔽", "➡️", "⬅️", "⬆️",
    "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "↪️",
    "↩️", "⤴️", "⤵️", "🔀", "🔁", "🔂", "🔄", "🔃",
    "🎵", "🎶", "➕", "➖", "➗", "✖️", "🟰", "♾️",
    "💲", "💱", "™️", "©️", "®️", "〰️", "➰", "➿",
    "🔚", "🔙", "🔛", "🔝", "🔜", "✔️", "☑️", "🔘",
    "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪",
    "🟤", "🔺", "🔻", "🔸", "🔹", "🔶", "🔷", "🔳",
    "🔲", "▪️", "▫️", "◾", "◽", "◼️", "◻️", "🟥",
    "🟧", "🟨", "🟩", "🟦", "🟪", "⬛", "⬜", "🟫",
    "🔈", "🔇", "🔉", "🔊", "🔔", "🔕", "📣", "📢",
    "💬", "💭", "🗯️", "♠️", "♣️", "♥️", "♦️", "🃏",
    "🎴", "🀄", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕",
    "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝",
    "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥",
    "🕦", "🕧",
  ],
};

const rewards = [
  { id: 1, name: "Premium Theme", cost: 100, icon: "🎨", claimed: false },
  { id: 2, name: "Custom Journal Cover", cost: 150, icon: "📔", claimed: false },
  { id: 3, name: "Meditation Pack", cost: 200, icon: "🧘", claimed: false },
  { id: 4, name: "Motivational Quotes", cost: 50, icon: "💭", claimed: false },
  { id: 5, name: "Mood Stickers", cost: 75, icon: "😊", claimed: false },
  { id: 6, name: "Voice Message Credits", cost: 250, icon: "🎤", claimed: false },
];

export function AccountPage({ isLoggedIn, onLogin, onLogout }: AccountPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  
  // Coin and Avatar state
  const [coins, setCoins] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState("😊");
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [lastClaimDate, setLastClaimDate] = useState<string | null>(null);
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);
  
  // Username editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [customUserName, setCustomUserName] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Mock login - in production, this would call an API
    toast.success("Login successful!", {
      description: `Welcome back to Unmutte!`,
    });
    onLogin(loginEmail);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (registerPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    // Mock registration - in production, this would call an API
    toast.success("Account created successfully!", {
      description: "Welcome to Unmutte! Your journey to wellness begins now.",
    });
    onLogin(registerEmail);
  };

  const handleGoogleLogin = () => {
    toast.info("Google Sign-In", {
      description: "This is a demo. In production, this would use Google OAuth.",
    });
    // Mock Google login
    setTimeout(() => {
      toast.success("Signed in with Google!");
      onLogin("user@gmail.com");
    }, 1000);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    onLogout();
  };

  // Load user data on component mount
  useEffect(() => {
    if (isLoggedIn) {
      // Load avatar
      const savedAvatar = localStorage.getItem("unmutte_user_avatar");
      if (savedAvatar) setSelectedAvatar(savedAvatar);

      // Load coins
      const savedCoins = localStorage.getItem("unmutte_user_coins");
      if (savedCoins) setCoins(parseInt(savedCoins));

      // Load last claim date
      const savedClaimDate = localStorage.getItem("unmutte_last_coin_claim");
      if (savedClaimDate) setLastClaimDate(savedClaimDate);

      // Load claimed rewards
      const savedRewards = localStorage.getItem("unmutte_claimed_rewards");
      if (savedRewards) setClaimedRewards(JSON.parse(savedRewards));

      // Load custom username
      const savedCustomName = localStorage.getItem("unmutte_custom_username");
      if (savedCustomName) setCustomUserName(savedCustomName);

      // Calculate coins from activity
      calculateCoinsFromActivity();
    }
  }, [isLoggedIn]);

  const calculateCoinsFromActivity = () => {
    // Get journal entries
    const journalEntries = localStorage.getItem("unmutte_journal_entries");
    const journalCount = journalEntries ? JSON.parse(journalEntries).length : 0;

    // Get mood tracker entries
    const moodEntries = localStorage.getItem("unmutte_mood_entries");
    const moodCount = moodEntries ? JSON.parse(moodEntries).length : 0;

    // Calculate total coins (5 coins per journal entry, 3 coins per mood entry)
    const calculatedCoins = (journalCount * 5) + (moodCount * 3);
    
    // Add any previously claimed daily bonuses
    const savedCoins = localStorage.getItem("unmutte_user_coins");
    const existingCoins = savedCoins ? parseInt(savedCoins) : 0;
    
    // Only update if calculated is higher (prevents losing daily bonuses)
    if (calculatedCoins > existingCoins) {
      setCoins(calculatedCoins);
      localStorage.setItem("unmutte_user_coins", calculatedCoins.toString());
    }
  };

  const handleClaimDailyCoins = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (lastClaimDate === today) {
      toast.error("You've already claimed your daily coins!", {
        description: "Come back tomorrow for more rewards!"
      });
      return;
    }

    const dailyBonus = 20;
    const newCoins = coins + dailyBonus;
    setCoins(newCoins);
    setLastClaimDate(today);
    
    localStorage.setItem("unmutte_user_coins", newCoins.toString());
    localStorage.setItem("unmutte_last_coin_claim", today);

    toast.success(`+${dailyBonus} coins claimed! 🎉`, {
      description: "Keep up your wellness journey!"
    });
  };

  const handleAvatarSelect = (emoji: string) => {
    setSelectedAvatar(emoji);
    localStorage.setItem("unmutte_user_avatar", emoji);
    setIsAvatarDialogOpen(false);
    toast.success("Avatar updated!");
  };

  const handleClaimReward = (reward: typeof rewards[0]) => {
    if (claimedRewards.includes(reward.id)) {
      toast.error("You've already claimed this reward!");
      return;
    }

    if (coins < reward.cost) {
      toast.error("Not enough coins!", {
        description: `You need ${reward.cost - coins} more coins.`
      });
      return;
    }

    const newCoins = coins - reward.cost;
    const newClaimedRewards = [...claimedRewards, reward.id];
    
    setCoins(newCoins);
    setClaimedRewards(newClaimedRewards);
    
    localStorage.setItem("unmutte_user_coins", newCoins.toString());
    localStorage.setItem("unmutte_claimed_rewards", JSON.stringify(newClaimedRewards));

    toast.success(`${reward.icon} ${reward.name} claimed!`, {
      description: "Check your profile for your new reward!"
    });
  };

  const canClaimDaily = () => {
    const today = new Date().toISOString().split('T')[0];
    return lastClaimDate !== today;
  };

  const handleStartEditingName = (currentName: string) => {
    setEditedName(currentName);
    setIsEditingName(true);
  };

  const handleSaveCustomName = () => {
    if (!editedName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setCustomUserName(editedName.trim());
    localStorage.setItem("unmutte_custom_username", editedName.trim());
    setIsEditingName(false);
    toast.success("Display name updated!", {
      description: "Your new name has been saved.",
    });
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  // If user is logged in, show profile page
  if (isLoggedIn) {
    const userEmail = localStorage.getItem("unmutte_user_email") || "user@example.com";
    const defaultUserName = userEmail.split("@")[0];
    const userName = customUserName || defaultUserName;

    // Calculate activity stats
    const journalEntries = localStorage.getItem("unmutte_journal_entries");
    const journalCount = journalEntries ? JSON.parse(journalEntries).length : 0;
    
    const moodEntries = localStorage.getItem("unmutte_mood_entries");
    const moodCount = moodEntries ? JSON.parse(moodEntries).length : 0;

    return (
      <div className="min-h-screen py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="mb-8 text-center">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="p-8 border-0 shadow-lg text-center lg:col-span-3">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarFallback className="bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] text-white text-5xl">
                      {selectedAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                        <Settings className="w-4 h-4 text-white" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle>Choose Your Avatar</DialogTitle>
                        <p className="text-sm text-muted-foreground">
                          Select an emoji to represent yourself
                        </p>
                      </DialogHeader>
                      <div className="overflow-y-auto max-h-[60vh] pr-[8px] pt-[0px] pb-[0px] pl-[0px]">
                        <Tabs defaultValue="people" className="w-full">
                          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-4">
                            <TabsTrigger value="people">👥</TabsTrigger>
                            <TabsTrigger value="smileys">😊</TabsTrigger>
                            <TabsTrigger value="gestures">👋</TabsTrigger>
                            <TabsTrigger value="animals">🐶</TabsTrigger>
                            <TabsTrigger value="nature">🌸</TabsTrigger>
                            <TabsTrigger value="food">🍎</TabsTrigger>
                            <TabsTrigger value="activities">⚽</TabsTrigger>
                            <TabsTrigger value="travel">✈️</TabsTrigger>
                          </TabsList>
                          
                          {Object.entries(avatarCategories).slice(0, 8).map(([category, emojis]) => (
                            <TabsContent key={category} value={category} className="mt-0">
                              <div className="grid grid-cols-8 md:grid-cols-10 gap-2 py-2">
                                {emojis.map((emoji, index) => (
                                  <motion.button
                                    key={`${category}-${index}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAvatarSelect(emoji)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                                      selectedAvatar === emoji 
                                        ? "bg-primary/20 ring-2 ring-primary" 
                                        : "hover:bg-muted"
                                    }`}
                                  >
                                    {emoji}
                                  </motion.button>
                                ))}
                              </div>
                            </TabsContent>
                          ))}
                          
                          <TabsList className="grid w-full grid-cols-2 mt-4 mb-4">
                            <TabsTrigger value="objects">🎨</TabsTrigger>
                            <TabsTrigger value="symbols">❤️</TabsTrigger>
                          </TabsList>
                          
                          {Object.entries(avatarCategories).slice(8).map(([category, emojis]) => (
                            <TabsContent key={category} value={category} className="mt-0">
                              <div className="grid grid-cols-8 md:grid-cols-10 gap-2 py-2">
                                {emojis.map((emoji, index) => (
                                  <motion.button
                                    key={`${category}-${index}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAvatarSelect(emoji)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                                      selectedAvatar === emoji 
                                        ? "bg-primary/20 ring-2 ring-primary" 
                                        : "hover:bg-muted"
                                    }`}
                                  >
                                    {emoji}
                                  </motion.button>
                                ))}
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Editable Username */}
                {isEditingName ? (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Enter display name"
                      className="max-w-xs text-center"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveCustomName();
                        if (e.key === 'Escape') handleCancelEditName();
                      }}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleSaveCustomName}
                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleCancelEditName}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 mb-2 group">
                    <h2 className="capitalize">{userName}</h2>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleStartEditingName(userName)}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Edit display name"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                
                <p className="text-muted-foreground mb-4">{userEmail}</p>
                
                {/* Coins Display */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg">
                    <Coins className="w-6 h-6" />
                    <span className="text-xl">{coins}</span>
                    <span className="text-sm">Wellness Coins</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => setIsAvatarDialogOpen(true)}
                  >
                    <Settings className="w-4 h-4" />
                    Change Avatar
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </Card>

              {/* Daily Coin Claim Card */}
              <Card className="lg:col-span-3 border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#7CB9E8] to-[#BFA2DB] p-6">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Gift className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-white mb-1">Daily Wellness Bonus</h3>
                        <p className="text-white/80 text-sm">
                          {canClaimDaily() 
                            ? "Claim your daily 20 coins!"
                            : "Come back tomorrow for more coins!"}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleClaimDailyCoins}
                      disabled={!canClaimDaily()}
                      className="bg-white text-primary hover:bg-white/90"
                    >
                      {canClaimDaily() ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Claim 20 Coins
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Claimed Today
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Stats Cards */}
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7CB9E8] to-[#BFA2DB] flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Journal Entries</p>
                    <p className="text-2xl">{journalCount}</p>
                    <p className="text-xs text-muted-foreground mt-1">+{journalCount * 5} coins earned</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F8C8DC] to-[#A8E6CF] flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Mood Entries</p>
                    <p className="text-2xl">{moodCount}</p>
                    <p className="text-xs text-muted-foreground mt-1">+{moodCount * 3} coins earned</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8E6CF] to-[#7CB9E8] flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rewards Claimed</p>
                    <p className="text-2xl">{claimedRewards.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Keep collecting!</p>
                  </div>
                </div>
              </Card>

              {/* Rewards & Freebies Section */}
              <Card className="lg:col-span-3 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift className="w-6 h-6 text-primary" />
                      <CardTitle>Rewards & Freebies</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      <Coins className="w-4 h-4 mr-2" />
                      {coins} coins
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rewards.map((reward) => {
                      const isClaimed = claimedRewards.includes(reward.id);
                      const canAfford = coins >= reward.cost;

                      return (
                        <motion.div
                          key={reward.id}
                          whileHover={{ scale: isClaimed ? 1 : 1.02 }}
                          className={`relative p-4 rounded-lg border-2 transition-all ${
                            isClaimed 
                              ? "bg-muted border-muted opacity-60" 
                              : canAfford
                              ? "border-primary/30 bg-primary/5 hover:border-primary"
                              : "border-border bg-card"
                          }`}
                        >
                          {isClaimed && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-green-500 text-white border-0">
                                <Check className="w-3 h-3 mr-1" />
                                Claimed
                              </Badge>
                            </div>
                          )}
                          <div className="text-center mb-3">
                            <div className="text-4xl mb-2">{reward.icon}</div>
                            <h4 className="text-sm mb-1">{reward.name}</h4>
                            <div className="flex items-center justify-center gap-1 text-muted-foreground">
                              <Coins className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{reward.cost}</span>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleClaimReward(reward)}
                            disabled={isClaimed || !canAfford}
                            size="sm"
                            className={`w-full ${
                              isClaimed 
                                ? "" 
                                : canAfford
                                ? "gradient-sky-lavender border-0"
                                : ""
                            }`}
                          >
                            {isClaimed ? "Claimed" : canAfford ? "Claim Reward" : "Not Enough Coins"}
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-blue-900 dark:text-blue-100 mb-1">
                          How to earn more coins
                        </p>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• Write journal entries (+5 coins each)</li>
                          <li>• Track your mood (+3 coins each)</li>
                          <li>• Claim daily bonus (+20 coins per day)</li>
                          <li>• Complete wellness sessions (+10 coins each)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="p-8 border-0 shadow-lg md:col-span-3">
                <h3 className="mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm">AI Chat Session</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm">Voice Call with Listener #A247</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm">Mood Journal Entry</p>
                      <p className="text-xs text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show login/register forms
  return (
    <div className="min-h-screen py-20 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="mb-4">Welcome to Unmutte</h1>
            <p className="text-muted-foreground">
              Sign in to access your personalized wellness journey
            </p>
          </div>

          <Card className="p-8 border-0 shadow-2xl">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full gradient-sky-lavender border-0">
                    Sign In
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => toast.info("Password reset link would be sent to your email")}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      OR
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Your Name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="register-confirm"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••���•"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gradient-sky-lavender border-0">
                    Create Account
                  </Button>

                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                      OR
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
