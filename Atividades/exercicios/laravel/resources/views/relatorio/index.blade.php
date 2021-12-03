@extends('principal')

@section('conteudo')

  <a href="{{ route('relatorio.pessoa') }}">Por pessoa</a>
  <a href="{{ route('relatorio.data') }}">Por data</a>
  <a href="{{ route('relatorio.produto') }}">Por produto</a>

@endsection