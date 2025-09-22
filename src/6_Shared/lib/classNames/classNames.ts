type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods, additional?: string[]): string {
    return [
        cls,
        ...additional.filter(Boolean), // фильтруем по булевскому фильтру, так как может попадатсья undefined
        ...Object.entries(mods)
            .filter(([cls, value]) => Boolean(value))
            .map(([cls, value]) => cls),
    ]
        .join(' ');
}
