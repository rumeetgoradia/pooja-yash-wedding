"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useGuest } from "~/hooks/use-guest";
const loginSchema = z.object({
    name: z.string().min(1, "Name is required"),
    password: z.string().min(1, "Password is required"),
});
type LoginFormData = z.infer<typeof loginSchema>;
interface LoginFormProps {
    onSuccess: (
        needsPartySelection: boolean,
        parties?: string[],
        guestName?: string,
    ) => void;
}
export function LoginForm({ onSuccess }: LoginFormProps) {
    const { setParty } = useGuest();
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    });
    const authenticateMutation = api.rsvp.authenticate.useMutation({
        onSuccess: (data) => {
            const name = form.getValues("name");
            if (data.needsPartySelection) {
                onSuccess(true, data.parties, name);
            } else if (data.party) {
                setParty(data.party);
                onSuccess(false);
            }
        },
        onError: (error) => {
            form.setError("root", {
                message: error.message,
            });
        },
    });
    const onSubmit = (data: LoginFormData) => {
        authenticateMutation.mutate(data);
    };
    return (
        <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
                <h1 className="font-serif text-4xl font-light text-neutral-900">
                    RSVP
                </h1>
                <p className="mt-2 text-neutral-600">
                    Please enter your name and the password provided in your invitation.
                </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-md">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="login-name">Your Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Pooja Antala"
                                        autoComplete="name"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="current-password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {form.formState.errors.root && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                                {form.formState.errors.root.message}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={authenticateMutation.isPending}
                        >
                            {authenticateMutation.isPending ? "Checking..." : "Continue"}
                        </Button>
                    </FieldGroup>
                </form>
            </div>
            <div className="mt-6 text-center text-sm text-neutral-600">
                <p>Having trouble? Please contact Pooja or Yash for assistance.</p>
            </div>
        </div>
    );
}