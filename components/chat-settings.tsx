import { LLMModelConfig } from "@/lib/models";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Settings2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function ChatSettings({
    apiKeyConfigurable,
    baseURLConfigurable,
    languageModel,
    onLanguageModelChange,
}: {
    apiKeyConfigurable: boolean;
    baseURLConfigurable: boolean;
    languageModel: LLMModelConfig;
    onLanguageModelChange: (model: LLMModelConfig) => void;
}) {
    return (
        <DropdownMenu>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger>
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="text-muted-foreground h-6 w-6 rounded-sm"
                            >
                                <Settings2 className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>LLM Settings</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="start">
                {apiKeyConfigurable && (
                    <>
                        <div className="flex flex-col gap-2 px-2 py-2">
                            <Label htmlFor="apiKey">API Key</Label>
                            <Input
                                type="password"
                                name="apiKey"
                                placeholder="Auto"
                                required={true}
                                defaultValue={languageModel.apiKey}
                                onChange={(e) =>
                                    onLanguageModelChange({
                                        apiKey:
                                            e.target.value.length > 0 ? e.target.value : undefined,
                                    })
                                }
                                className="text-sm"
                            />
                        </div>
                        <DropdownMenuSeparator />
                    </>
                )}

                {baseURLConfigurable && (
                    <>
                        <div className="flex flex-col gap-2 px-2 py-2">
                            <Label htmlFor="baseURL">Base URL</Label>
                            <Input
                                type="text"
                                name="baseURL"
                                placeholder="Auto"
                                required={true}
                                defaultValue={languageModel.baseURL}
                                onChange={(e) =>
                                    onLanguageModelChange({
                                        baseURL:
                                            e.target.value.length > 0 ? e.target.value : undefined,
                                    })
                                }
                                className="text-sm"
                            />
                        </div>
                        <DropdownMenuSeparator />
                    </>
                )}

                <div className="flex flex-col gap-1.5 px-2 py-2">
                    <span className="text-sm font-medium">Parameters</span>
                    <div className="flex space-x-4 items-center">
                        <span className="text-sm flex-1 text-muted-foreground">Output tokens</span>
                        <Input
                            type="number"
                            defaultValue={languageModel.maxTokens}
                            min={50}
                            max={10000}
                            step={1}
                            placeholder="Auto"
                            onChange={(e) =>
                                onLanguageModelChange({
                                    maxTokens: parseFloat(e.target.value) || undefined,
                                })}
                            className="h-6 w-[84p] rounded-sm text-xs text-center tabular-nums"
                        />
                    </div>
                    <div className="flex space-x-4 items-center">
                        <span className="text-sm flex-1 text-muted-foreground">Temperature</span>
                        <Input
                            type="number"
                            defaultValue={languageModel.temperature}
                            min={0}
                            max={5}
                            step={0.01}
                            placeholder="Auto"
                            onChange={(e) =>
                                onLanguageModelChange({
                                    temperature: parseFloat(e.target.value) || undefined,
                                })}
                            className="h-6 w-[84p] rounded-sm text-xs text-center tabular-nums"
                        />
                    </div>
                    <div className="flex space-x-4 items-center">
                        <span className="text-sm flex-1 text-muted-foreground">Top P</span>
                        <Input
                            type="number"
                            defaultValue={languageModel.topP}
                            min={0}
                            max={1}
                            step={0.01}
                            placeholder="Auto"
                            onChange={(e) =>
                                onLanguageModelChange({
                                    topP: parseFloat(e.target.value) || undefined,
                                })}
                            className="h-6 w-[84p] rounded-sm text-xs text-center tabular-nums"
                        />
                    </div>
                    <div className="flex space-x-4 items-center">
                        <span className="text-sm flex-1 text-muted-foreground">Top K</span>
                        <Input
                            type="number"
                            defaultValue={languageModel.topK}
                            min={0}
                            max={500}
                            step={1}
                            placeholder="Auto"
                            onChange={(e) =>
                                onLanguageModelChange({
                                    topK: parseFloat(e.target.value) || undefined,
                                })}
                            className="h-6 w-[84p] rounded-sm text-xs text-center tabular-nums"
                        />
                    </div>
                    <div className="flex space-x-4 items-center">
                        <span className="text-sm flex-1 text-muted-foreground">Frequence Penalty</span>
                        <Input
                            type="number"
                            defaultValue={languageModel.frequencyPenalty}
                            min={0}
                            max={2}
                            step={0.01}
                            placeholder="Auto"
                            onChange={(e) =>
                                onLanguageModelChange({
                                    frequencyPenalty: parseFloat(e.target.value) || undefined,
                                })}
                            className="h-6 w-[84p] rounded-sm text-xs text-center tabular-nums"
                        />
                    </div>
                    <div className="flex space-x-4 items-center">
                        <span className="text-sm flex-1 text-muted-foreground">Presence Penalty</span>
                        <Input
                            type="number"
                            defaultValue={languageModel.presencePenalty}
                            min={0}
                            max={2}
                            step={0.01}
                            placeholder="Auto"
                            onChange={(e) =>
                                onLanguageModelChange({
                                    presencePenalty: parseFloat(e.target.value) || undefined,
                                })}
                            className="h-6 w-[84p] rounded-sm text-xs text-center tabular-nums"
                        />
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
