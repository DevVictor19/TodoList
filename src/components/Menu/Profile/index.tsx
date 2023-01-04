import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useCallback } from "react";
import { UserCircle, SignOut } from "phosphor-react";
import { useAuth } from "../../../hooks/useAuth";
import { Card } from "../../Card";
import { toast } from "react-toastify";
import { useScreenWidth } from "../../../hooks/useScreenWidth";

export function Profile() {
  const { logout } = useAuth();
  const screenWidth = useScreenWidth();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast.info("User logged out ");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <UserCircle size={screenWidth > 1024 ? 26 : 22} weight="fill" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5}>
          <Card styleClasses="p-5">
            <nav>
              <DropdownMenu.Item
                className="flex items-center gap-4 cursor-pointer"
                onClick={handleLogout}
              >
                <SignOut size={20} /> Sign out
              </DropdownMenu.Item>
            </nav>
          </Card>
          <DropdownMenu.Arrow className="fill-white dark:fill-[#25273D]" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
