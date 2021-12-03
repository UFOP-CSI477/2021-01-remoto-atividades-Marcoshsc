@extends('principal')

@section('conteudo')

    <div class="alert alert-primary text-center">
        <a href="{{route('compras.create')}}">Cadastrar</a>
    </div>

    <table class="table table-bordered table-hover table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Pessoa</th>
                <th>Produto</th>
                <th>Data</th>
                <th>Exibir</th>
            </tr>
        </thead>
        <tbody>
            @foreach($compras as $c)
                <tr>
                    <td>{{ $c->id }}</td>
                    <td>{{ $c->pessoa->nome }}</td>
                    <td>{{ $c->produto->nome }}</td>
                    <td>{{ $c->data }}</td>
                    <td><a href="{{ route('compras.show', $c->id)}}">Exibir</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>

@endsection('conteudo')
