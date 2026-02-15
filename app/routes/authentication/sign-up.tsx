import { redirect } from "react-router"
import type { Route } from "./+types/sign-up"
import { SignupForm } from "./components/signup-form"
import { useTranslation } from "react-i18next"
import { ThemeToggle } from "@/components/theme-toggle"

export const handle = { i18n: ["auth"] };

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await context.auth.api.getSession({
    headers: request.headers,
  });
  if (session) return redirect("/dashboard");
  return {};
}

export default function SignUp() {
  const { t } = useTranslation("common")

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-xs font-bold">{t("app_name_short")}</span>
          </div>
          {t("app_name")}
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
