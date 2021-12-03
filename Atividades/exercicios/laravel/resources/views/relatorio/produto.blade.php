@extends('principal')

@section('conteudo')

  <form action="{{ route('relatorio.produto.search')}}" method="get">
        <div class="form-group">
            <label for="produto_id">Produto</label>

            <select name="produto_id" id="produto_id" class="form-control">

            @foreach($produtos as $pr)
                <option value="{{$pr->id}}">{{$pr->nome}}</option>
            @endforeach

            </select>

        </div>
        <button type="submit">Procurar</button>

  </form>

  @foreach($compras as $c)
      <p>Compra feita por {{ $c->pessoa->nome }} as {{ $c->data }}, produto {{ $c->produto->nome }}</p>
  @endforeach

@endsection