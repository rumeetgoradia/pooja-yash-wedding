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
    name: z.string().min(1, "Please enter your name."),
});
type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onSuccess: (
        needsPartySelection: boolean,
        parties?: string[],
        guestName?: string
    ) => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
    const { setParty } = useGuest();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { name: "" },
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
            form.setError("root", { message: error.message });
        },
    });

    const onSubmit = (data: LoginFormData) => {
        authenticateMutation.mutate(data);
    };

    return (
        <section className="mx-auto max-w-md px-4">
            <div className="mb-8 text-center">
                <h1 className="font-serif text-4xl font-light leading-tight text-neutral-900">
                    RSVP
                </h1>
                <p className="mt-2 text-sm text-neutral-600">
                    Please enter your name to access your party&apos;s RSVP.
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200/60 md:p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <FieldGroup className=" ">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="login-name">Your name</FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Pooja Antala"
                                        autoComplete="name"
                                        autoFocus
                                        className="border-neutral-300 focus-visible:ring-neutral-500"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError className="text-red-700" errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {form.formState.errors.root && (
                            <div className="rounded-md text-center bg-red-50 p-3 text-sm text-red-800">
                                {form.formState.errors.root.message}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="mt-2 w-full"
                            disabled={authenticateMutation.isPending}
                            size="lg"
                        >
                            {authenticateMutation.isPending ? "Checking…" : "Continue"}
                        </Button>
                    </FieldGroup>
                </form>
            </div>

            <div className="mt-6 text-center text-sm text-neutral-600">
                Having trouble? Please contact Pooja or Yash for assistance.
            </div>
        </section>
    );
}
