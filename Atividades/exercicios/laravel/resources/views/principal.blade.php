<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/produtos/globals.css') }}" />
    <title>Home</title>
  </head>
  <body>
    <header>
      <nav class="nav-bar">
        <ul>
          <li class="nav-item">
            <a href="{{route('principal')}}">Home</a>
          </li>
          <li class="nav-item">
            <a href="{{route('produtos.index')}}">Produtos</a>
          </li>
          <li class="nav-item">
            <a href="{{route('cidades.index')}}">Cidades</a>
          </li>
          <li class="nav-item">
            <a href="{{route('estados.index')}}">Estados</a>
          </li>
          <li class="nav-item">
            <a href="{{route('pessoas.index')}}">Pessoas</a>
          </li>
          <li class="nav-item">
            <a href="{{route('compras.index')}}">Compras</a>
          </li>
          <li class="nav-item">
            <a href="{{route('relatorio.index')}}">Relatórios</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="container-home">
        @if(session('mensagem'))

          <div class="alert alert-success">
            {{ session('mensagem') }}
          </div>

        @endif
        @yield('conteudo')
      </div>
    </main>
  </body>
</html>
