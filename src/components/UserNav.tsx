import { Link } from "@tanstack/react-router";
import { User, LogOut, Shield, UserCircle, Scale } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { user, loading, avatarUrl, displayName, isAdmin, signOut } = useAuth();

  if (loading) {
    return (
      <div
        className="size-9 animate-pulse rounded-full border border-border bg-card/60"
        aria-hidden="true"
      />
    );
  }

  if (!user) {
    return (
      <Link
        to="/auth"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-bold text-foreground shadow-xs backdrop-blur-md transition-all hover:border-brand hover:text-brand hover:scale-105"
      >
        <User className="size-3.5 text-brand" />
        <span>دخول</span>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group relative inline-flex size-9.5 items-center justify-center overflow-hidden rounded-full border border-border bg-card/90 shadow-xs ring-2 ring-transparent transition-all hover:scale-105 hover:ring-brand/40 focus:outline-none"
          aria-label="قائمة حسابي"
          title={`حسابي (${displayName})`}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="size-full object-cover rounded-full"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-tr from-brand to-secondary text-xs font-bold text-white uppercase">
              {displayName.slice(0, 2)}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5 text-right font-sans" dir="rtl">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold leading-none text-foreground truncate">
                {displayName}
              </p>
              {isAdmin && (
                <span className="pill text-[10px] bg-brand/15 text-brand border border-brand/30 py-0 px-1.5">
                  مشرف
                </span>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/account" className="flex w-full items-center gap-2 cursor-pointer py-2">
            <UserCircle className="size-4 text-brand" />
            <span className="font-medium text-sm">حسابي والملف الأكاديمي</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/compare" className="flex w-full items-center gap-2 cursor-pointer py-2">
            <Scale className="size-4 text-secondary" />
            <span className="font-medium text-sm">مختبر المقارنة اللحظية</span>
          </Link>
        </DropdownMenuItem>

        {/* يظهر خيار لوحة التحديثات فقط وحصراً للمشرفين المعتمدين */}
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link
              to="/updates"
              className="flex w-full items-center gap-2 cursor-pointer py-2 text-danger hover:text-danger"
            >
              <Shield className="size-4 text-brand" />
              <span className="font-bold text-sm text-foreground">لوحة التحديثات (إدارة)</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => void signOut()}
          className="flex w-full items-center gap-2 cursor-pointer py-2 text-danger focus:text-danger"
        >
          <LogOut className="size-4 text-danger" />
          <span className="font-medium text-sm">تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
