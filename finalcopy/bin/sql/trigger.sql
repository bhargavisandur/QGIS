create function delete_old_victim() returns trigger language plpgsql as $$ begin
delete from victim
where
  id =(
    select
      vid
    from rescued_child
    where
      id =(
        select
          max(id)
        from rescued_child
      )
  );
return null;
end;
$$;
CREATE TRIGGER trigger_delete_old_victims
AFTER
INSERT ON rescued_child EXECUTE PROCEDURE delete_old_victim();