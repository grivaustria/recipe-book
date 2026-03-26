-- Corrective migration for a misconfigured project that was initialized
-- with the old consolidated recipe schema instead of the split
-- recipes / ingredients / procedure tables.

do $$
begin
  if to_regclass('public.recipes') is not null then
    execute 'drop trigger if exists recipes_set_updated_at on public.recipes';
  end if;
end
$$;

do $$
begin
  if to_regclass('public.profiles') is not null then
    execute 'drop trigger if exists profiles_set_updated_at on public.profiles';
  end if;
end
$$;

drop trigger if exists on_auth_user_created on auth.users;

drop function if exists public.set_updated_at();
drop function if exists public.handle_new_user();

drop table if exists public.ingredients cascade;
drop table if exists public.procedure cascade;
drop table if exists public.recipes cascade;
drop table if exists public.profiles cascade;

create extension if not exists pgcrypto;

create table if not exists public.recipes (
  id text primary key,
  "dishName" text not null,
  "dishType" text not null,
  "dishImage" text,
  "userId" uuid not null references auth.users (id) on delete cascade
);

create table if not exists public.ingredients (
  id uuid primary key default gen_random_uuid(),
  quantity text,
  unit text,
  name text not null,
  "recipeId" text not null references public.recipes (id) on delete cascade
);

create table if not exists public.procedure (
  id uuid primary key default gen_random_uuid(),
  "recipeId" text not null references public.recipes (id) on delete cascade,
  "stepNumber" int2 not null,
  description text not null
);

create index if not exists recipes_user_id_idx
  on public.recipes ("userId");

create index if not exists ingredients_recipe_id_idx
  on public.ingredients ("recipeId");

create index if not exists procedure_recipe_id_idx
  on public.procedure ("recipeId");

create index if not exists procedure_recipe_id_step_number_idx
  on public.procedure ("recipeId", "stepNumber");

alter table public.recipes enable row level security;
alter table public.ingredients enable row level security;
alter table public.procedure enable row level security;

drop policy if exists "Recipes are viewable by the owner" on public.recipes;
create policy "Recipes are viewable by the owner"
  on public.recipes
  for select
  to authenticated
  using (auth.uid() = "userId");

drop policy if exists "Recipes are insertable by the owner" on public.recipes;
create policy "Recipes are insertable by the owner"
  on public.recipes
  for insert
  to authenticated
  with check (auth.uid() = "userId");

drop policy if exists "Recipes are updatable by the owner" on public.recipes;
create policy "Recipes are updatable by the owner"
  on public.recipes
  for update
  to authenticated
  using (auth.uid() = "userId")
  with check (auth.uid() = "userId");

drop policy if exists "Recipes are deletable by the owner" on public.recipes;
create policy "Recipes are deletable by the owner"
  on public.recipes
  for delete
  to authenticated
  using (auth.uid() = "userId");

drop policy if exists "Ingredients are viewable by the recipe owner" on public.ingredients;
create policy "Ingredients are viewable by the recipe owner"
  on public.ingredients
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );

drop policy if exists "Ingredients are insertable by the recipe owner" on public.ingredients;
create policy "Ingredients are insertable by the recipe owner"
  on public.ingredients
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );

drop policy if exists "Ingredients are updatable by the recipe owner" on public.ingredients;
create policy "Ingredients are updatable by the recipe owner"
  on public.ingredients
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );

drop policy if exists "Ingredients are deletable by the recipe owner" on public.ingredients;
create policy "Ingredients are deletable by the recipe owner"
  on public.ingredients
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );

drop policy if exists "Procedure is viewable by the recipe owner" on public.procedure;
create policy "Procedure is viewable by the recipe owner"
  on public.procedure
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );

drop policy if exists "Procedure is insertable by the recipe owner" on public.procedure;
create policy "Procedure is insertable by the recipe owner"
  on public.procedure
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );

drop policy if exists "Procedure is updatable by the recipe owner" on public.procedure;
create policy "Procedure is updatable by the recipe owner"
  on public.procedure
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );

drop policy if exists "Procedure is deletable by the recipe owner" on public.procedure;
create policy "Procedure is deletable by the recipe owner"
  on public.procedure
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.recipes
      where public.recipes.id = "recipeId"
        and public.recipes."userId" = auth.uid()
    )
  );
