import {
  fetchFormByShareUrlAction,
  fetchSingleFormAction,
} from "@/actions/form.actions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FormNotPublished({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetch-single-form", id],
    queryFn: () => fetchSingleFormAction(id!),
    staleTime: 5000,
  });

  const {
    data: _data,
    isError: _isError,
    error: _error,
    isLoading: _isLoading,
  } = useQuery({
    queryKey: ["fetch-single-form-content", id],
    queryFn: () => fetchFormByShareUrlAction(id!),
    staleTime: 5000,
  });

  console.log(
    "@@@formNotPublished",
    data?.data.published,
    _data?.data.published,
  );

  useEffect(() => {
    if (!data?.data.published || !_data?.data.published) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [data?.data.published, navigate, _data?.data.published]);

  return <div>{children}</div>;
}
